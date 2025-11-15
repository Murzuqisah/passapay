// Contract configuration - update after deployment
export const CONTRACT_CONFIG = {
  // Moonbase Alpha (Testnet)
  moonbaseAlpha: {
    contractAddress: '0x42e08b134c98a0c2adb443d7481c52d2b97e1e72', // Deployed contract
    chainId: 1287,
    rpcUrl: 'https://rpc.api.moonbase.moonbeam.network',
    explorerUrl: 'https://moonbase.moonscan.io',
    nativeCurrency: {
      name: 'DEV',
      symbol: 'DEV',
      decimals: 18
    }
  },
  // Moonbeam (Mainnet)
  moonbeam: {
    contractAddress: '0x0000000000000000000000000000000000000000', // UPDATE AFTER DEPLOYMENT
    chainId: 1284,
    rpcUrl: 'https://rpc.api.moonbeam.network',
    explorerUrl: 'https://moonscan.io',
    nativeCurrency: {
      name: 'GLMR',
      symbol: 'GLMR',
      decimals: 18
    }
  }
}

// Default to testnet
export const ACTIVE_NETWORK = CONTRACT_CONFIG.moonbaseAlpha
