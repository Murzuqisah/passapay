// Platform configuration
export const PLATFORM_CONFIG = {
  // Platform wallet address that receives fees
  platformAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  
  // Platform fee percentage (5%)
  feePercentage: 5,
  
  // Calculate amounts
  calculateFee: (amount: string) => {
    const amountNum = parseFloat(amount)
    const fee = (amountNum * PLATFORM_CONFIG.feePercentage) / 100
    const netAmount = amountNum - fee
    return {
      fee: fee.toFixed(4),
      netAmount: netAmount.toFixed(4),
      total: amount
    }
  }
}
