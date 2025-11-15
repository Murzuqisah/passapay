// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title PassaPay
 * @dev Secure escrow payment contract with reentrancy protection and proper fee accounting
 * @notice This contract facilitates secure payments between promoters and artists with platform fees
 */
contract PassaPay {
    
    // ============ State Variables ============
    
    enum PaymentStatus { Pending, Completed, Disputed, Refunded, Cancelled }
    
    struct Payment {
        address from;
        address to;
        uint256 amount;           // Amount after fees
        uint256 createdAt;
        uint256 deadline;         // Time limit for completion
        PaymentStatus status;
    }
    
    mapping(bytes32 => Payment) public payments;
    address public owner;
    
    uint256 public platformFeePercentage = 250; // 2.5% in basis points
    uint256 public constant FEE_DENOMINATOR = 10000;
    uint256 public constant DEFAULT_DEADLINE = 30 days;
    uint256 public constant MAX_FEE_PERCENTAGE = 1000; // 10% max
    
    uint256 public accumulatedFees;   // Track fees separately
    bool private locked;              // Reentrancy guard
    bool public paused;               // Emergency pause mechanism
    
    // ============ Events ============
    
    event PaymentCreated(
        bytes32 indexed paymentId, 
        address indexed from, 
        address indexed to, 
        uint256 amount, 
        uint256 deadline
    );
    event PaymentCompleted(bytes32 indexed paymentId, address indexed recipient);
    event PaymentDisputed(bytes32 indexed paymentId, address indexed disputedBy);
    event PaymentRefunded(bytes32 indexed paymentId);
    event PaymentCancelled(bytes32 indexed paymentId);
    event FeesWithdrawn(address indexed owner, uint256 amount);
    event FeePercentageUpdated(uint256 oldFee, uint256 newFee);
    event ContractPaused(address indexed by);
    event ContractUnpaused(address indexed by);
    
    // ============ Custom Errors ============
    
    error Unauthorized();
    error InvalidAmount();
    error InvalidAddress();
    error PaymentNotFound();
    error InvalidStatus();
    error TransferFailed();
    error ContractIsPaused();
    error DeadlineExpired();
    error DeadlineNotExpired();
    error Reentrancy();
    error FeeTooHigh();
    
    // ============ Modifiers ============
    
    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }
    
    modifier nonReentrant() {
        if (locked) revert Reentrancy();
        locked = true;
        _;
        locked = false;
    }
    
    modifier whenNotPaused() {
        if (paused) revert ContractIsPaused();
        _;
    }
    
    modifier onlyPaymentParty(bytes32 paymentId) {
        Payment storage payment = payments[paymentId];
        if (payment.amount == 0) revert PaymentNotFound();
        if (msg.sender != payment.from && msg.sender != payment.to) {
            revert Unauthorized();
        }
        _;
    }
    
    // ============ Constructor ============
    
    constructor() {
        owner = msg.sender;
    }
    
    // ============ Main Functions ============
    
    /**
     * @notice Create a new payment with escrow
     * @param artist The address of the artist receiving payment
     * @return paymentId Unique identifier for the payment
     */
    function createPayment(address artist) 
        external 
        payable 
        whenNotPaused 
        returns (bytes32) 
    {
        if (msg.value == 0) revert InvalidAmount();
        if (artist == address(0)) revert InvalidAddress();
        
        // Calculate fees
        uint256 platformFee = (msg.value * platformFeePercentage) / FEE_DENOMINATOR;
        uint256 artistAmount = msg.value - platformFee;
        
        // Generate unique payment ID
        bytes32 paymentId = keccak256(
            abi.encodePacked(
                msg.sender, 
                artist, 
                block.timestamp, 
                block.number,
                msg.value
            )
        );
        
        uint256 deadline = block.timestamp + DEFAULT_DEADLINE;
        
        // Store payment details
        payments[paymentId] = Payment({
            from: msg.sender,
            to: artist,
            amount: artistAmount,
            createdAt: block.timestamp,
            deadline: deadline,
            status: PaymentStatus.Pending
        });
        
        // Accumulate platform fees
        accumulatedFees += platformFee;
        
        emit PaymentCreated(paymentId, msg.sender, artist, artistAmount, deadline);
        return paymentId;
    }
    
    /**
     * @notice Complete a payment and release funds to artist
     * @param paymentId The ID of the payment to complete
     */
    function completePayment(bytes32 paymentId) 
        external 
        nonReentrant 
        whenNotPaused
        onlyPaymentParty(paymentId)
    {
        Payment storage payment = payments[paymentId];
        
        if (payment.status != PaymentStatus.Pending) revert InvalidStatus();
        
        // Update state BEFORE external call (Checks-Effects-Interactions)
        payment.status = PaymentStatus.Completed;
        uint256 amountToSend = payment.amount;
        payment.amount = 0; // Prevent double-spending
        
        // Emit event before external call
        emit PaymentCompleted(paymentId, payment.to);
        
        // External call last
        (bool success, ) = payable(payment.to).call{value: amountToSend}("");
        if (!success) revert TransferFailed();
    }
    
    /**
     * @notice Dispute a pending payment
     * @param paymentId The ID of the payment to dispute
     */
    function disputePayment(bytes32 paymentId) 
        external 
        whenNotPaused
        onlyPaymentParty(paymentId)
    {
        Payment storage payment = payments[paymentId];
        
        if (payment.status != PaymentStatus.Pending) revert InvalidStatus();
        
        payment.status = PaymentStatus.Disputed;
        
        emit PaymentDisputed(paymentId, msg.sender);
    }
    
    /**
     * @notice Resolve a disputed payment (owner only)
     * @param paymentId The ID of the disputed payment
     * @param refundPromoter True to refund promoter, false to pay artist
     */
    function resolveDispute(bytes32 paymentId, bool refundPromoter) 
        external 
        onlyOwner 
        nonReentrant 
    {
        Payment storage payment = payments[paymentId];
        
        if (payment.status != PaymentStatus.Disputed) revert InvalidStatus();
        
        // Update state BEFORE external call
        address recipient = refundPromoter ? payment.from : payment.to;
        payment.status = refundPromoter ? PaymentStatus.Refunded : PaymentStatus.Completed;
        uint256 amountToSend = payment.amount;
        payment.amount = 0;
        
        // Emit event before external call
        if (refundPromoter) {
            emit PaymentRefunded(paymentId);
        } else {
            emit PaymentCompleted(paymentId, payment.to);
        }
        
        // External call last
        (bool success, ) = payable(recipient).call{value: amountToSend}("");
        if (!success) revert TransferFailed();
    }
    
    /**
     * @notice Cancel a payment after deadline expires without completion
     * @param paymentId The ID of the payment to cancel
     */
    function cancelExpiredPayment(bytes32 paymentId) 
        external 
        nonReentrant
        onlyPaymentParty(paymentId)
    {
        Payment storage payment = payments[paymentId];
        
        if (payment.status != PaymentStatus.Pending) revert InvalidStatus();
        if (block.timestamp <= payment.deadline) revert DeadlineNotExpired();
        
        // Refund to promoter after deadline
        payment.status = PaymentStatus.Cancelled;
        uint256 amountToSend = payment.amount;
        payment.amount = 0;
        
        emit PaymentCancelled(paymentId);
        
        (bool success, ) = payable(payment.from).call{value: amountToSend}("");
        if (!success) revert TransferFailed();
    }
    
    // ============ View Functions ============
    
    /**
     * @notice Get payment details
     * @param paymentId The ID of the payment
     * @return Payment struct with all details
     */
    function getPayment(bytes32 paymentId) 
        external 
        view 
        returns (Payment memory) 
    {
        return payments[paymentId];
    }
    
    /**
     * @notice Calculate the amount artist will receive after fees
     * @param grossAmount The gross payment amount
     * @return net amount after platform fee
     */
    function calculateNetAmount(uint256 grossAmount) 
        external 
        view 
        returns (uint256) 
    {
        uint256 fee = (grossAmount * platformFeePercentage) / FEE_DENOMINATOR;
        return grossAmount - fee;
    }
    
    /**
     * @notice Get total funds held in escrow (excluding accumulated fees)
     * @return Total balance minus accumulated fees
     */
    function getEscrowedFunds() external view returns (uint256) {
        uint256 balance = address(this).balance;
        return balance > accumulatedFees ? balance - accumulatedFees : 0;
    }
    
    // ============ Admin Functions ============
    
    /**
     * @notice Update platform fee percentage (owner only)
     * @param newFeePercentage New fee in basis points (max 10%)
     */
    function setPlatformFee(uint256 newFeePercentage) external onlyOwner {
        if (newFeePercentage > MAX_FEE_PERCENTAGE) revert FeeTooHigh();
        
        uint256 oldFee = platformFeePercentage;
        platformFeePercentage = newFeePercentage;
        
        emit FeePercentageUpdated(oldFee, newFeePercentage);
    }
    
    /**
     * @notice Withdraw accumulated platform fees (owner only)
     */
    function withdrawFees() external onlyOwner nonReentrant {
        uint256 feesToWithdraw = accumulatedFees;
        if (feesToWithdraw == 0) revert InvalidAmount();
        
        // Update state before transfer
        accumulatedFees = 0;
        
        emit FeesWithdrawn(owner, feesToWithdraw);
        
        (bool success, ) = payable(owner).call{value: feesToWithdraw}("");
        if (!success) revert TransferFailed();
    }
    
    /**
     * @notice Pause contract in case of emergency (owner only)
     */
    function pause() external onlyOwner {
        paused = true;
        emit ContractPaused(msg.sender);
    }
    
    /**
     * @notice Unpause contract (owner only)
     */
    function unpause() external onlyOwner {
        paused = false;
        emit ContractUnpaused(msg.sender);
    }
    
    /**
     * @notice Transfer ownership (owner only)
     * @param newOwner Address of new owner
     */
    function transferOwnership(address newOwner) external onlyOwner {
        if (newOwner == address(0)) revert InvalidAddress();
        owner = newOwner;
    }
    
    // ============ Fallback ============
    
    receive() external payable {
        // Reject direct payments
        revert InvalidAmount();
    }
}