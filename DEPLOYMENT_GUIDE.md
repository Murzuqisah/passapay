# PassaPay Smart Contract Deployment Guide

## Prerequisites
- MetaMask installed with Moonbase Alpha testnet configured
- Get testnet DEV tokens from [Moonbeam Faucet](https://faucet.moonbeam.network/)

## Step 1: Deploy Contract on Remix

1. Go to [remix.ethereum.org](https://remix.ethereum.org)
2. Create new file: `PassaPayment.sol`
3. Copy contract code from `/contracts/PassaPayment.sol`
4. Compile:
   - Compiler: `0.8.19` or higher
   - Click "Compile PassaPayment.sol"
5. Deploy:
   - Environment: "Injected Provider - MetaMask"
   - Connect MetaMask to Moonbase Alpha
   - Click "Deploy"
   - Confirm transaction in MetaMask
6. Copy deployed contract address

## Step 2: Update Frontend Configuration

Edit `app/utils/contract-config.ts`:

```typescript
export const CONTRACT_CONFIG = {
  moonbaseAlpha: {
    contractAddress: '0xYOUR_DEPLOYED_CONTRACT_ADDRESS', // Paste here
    // ... rest stays same
  }
}
```

## Step 3: Test the Integration

```bash
npm run dev
```

### Test Flow:
1. Connect MetaMask wallet
2. Go to promoter dashboard
3. Create payment to artist address
4. Confirm transaction in MetaMask
5. Wait for confirmation
6. Artist can complete payment

## Network Details

### Moonbase Alpha (Testnet)
- **Chain ID**: 1287
- **RPC**: https://rpc.api.moonbase.moonbeam.network
- **Explorer**: https://moonbase.moonscan.io
- **Faucet**: https://faucet.moonbeam.network/
- **Currency**: DEV (testnet token)

### Add to MetaMask:
- Network Name: Moonbase Alpha
- RPC URL: https://rpc.api.moonbase.moonbeam.network
- Chain ID: 1287
- Symbol: DEV
- Block Explorer: https://moonbase.moonscan.io

## Contract Functions

### For Promoters:
- `createPayment(artistAddress)` - Send payment (payable, sends DEV)
- `completePayment(paymentId)` - Release payment to artist

### For Artists:
- `completePayment(paymentId)` - Claim payment

### For Admin:
- `withdrawFees()` - Withdraw platform fees
- `setPlatformFee(percentage)` - Update fee (max 10%)
- `resolveDispute(paymentId, refund)` - Handle disputes

## Frontend Usage

```typescript
import { useContractPayment } from '@/app/hooks/use-contract-payment'

function PaymentComponent() {
  const { createPayment, isProcessing, result } = useContractPayment()
  
  const handlePay = async () => {
    await createPayment(
      '0xArtistAddress',
      '1.0' // Amount in DEV
    )
  }
  
  return (
    <button onClick={handlePay} disabled={isProcessing}>
      {isProcessing ? 'Processing...' : 'Send Payment'}
    </button>
  )
}
```

## Troubleshooting

**"Insufficient funds"**
- Get DEV tokens from faucet

**"Wrong network"**
- Switch MetaMask to Moonbase Alpha

**"Transaction failed"**
- Check artist address is valid
- Ensure amount > 0
- Check gas settings

## Production Deployment

For mainnet (Moonbeam):
1. Deploy to Moonbeam mainnet (Chain ID: 1284)
2. Update `ACTIVE_NETWORK` in `contract-config.ts`
3. Use GLMR instead of DEV
4. Test thoroughly before going live
