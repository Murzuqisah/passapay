// Contract configuration - update after deployment
export const CONTRACT_CONFIG = {
  // Moonbase Alpha (Testnet)
  moonbaseAlpha: {
    contractAddress: '0x42e08b134c98a0c2adb443d7481c52d2b97e1e72', // Deployed contract
    chainId: 1287,
    rpcUrls: [
      'https://rpc.api.moonbase.moonbeam.network',
      'https://moonbase-alpha.public.blastapi.io',
      'https://moonbase.unitedbloc.com:2000'
    ],
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
    rpcUrls: [
      'https://rpc.api.moonbeam.network',
      'https://moonbeam.public.blastapi.io',
      'https://moonbeam.unitedbloc.com'
    ],
    explorerUrl: 'https://moonscan.io',
    nativeCurrency: {
      name: 'GLMR',
      symbol: 'GLMR',
      decimals: 18
    }
  }
}

// Default to testnet
export const ACTIVE_NETWORK = {
  ...CONTRACT_CONFIG.moonbaseAlpha,
  rpcUrl: CONTRACT_CONFIG.moonbaseAlpha.rpcUrls[0] // Keep backward compatibility
}

// RPC fallback helper
export const getRpcUrl = (networkKey: keyof typeof CONTRACT_CONFIG = 'moonbaseAlpha') => {
  const network = CONTRACT_CONFIG[networkKey]
  return network.rpcUrls[0]
}

// Get all RPC URLs for a network
export const getAllRpcUrls = (networkKey: keyof typeof CONTRACT_CONFIG = 'moonbaseAlpha') => {
  return CONTRACT_CONFIG[networkKey].rpcUrls
}
