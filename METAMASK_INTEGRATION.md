# MetaMask Integration for Moonbeam

## Overview
MetaMask support has been added to PassaPay, allowing users to connect via Moonbeam (EVM-compatible Polkadot parachain). This enables both Polkadot and Ethereum wallet users to access the platform.

## How It Works

### Current Flow (Polkadot Wallets)
1. User clicks "Connect Wallet"
2. Modal shows installed Polkadot wallets (Talisman, Polkadot.js, etc.)
3. User selects wallet → connects → selects account
4. System checks if user exists → onboarding or dashboard redirect

### New Flow (MetaMask)
1. User clicks "Connect Wallet"
2. Modal shows MetaMask option (if installed) + Polkadot wallets
3. User clicks MetaMask → connects to Moonbeam network
4. Fetches Ethereum address and GLMR balance
5. Same onboarding/dashboard flow as Polkadot wallets

## Implementation

### Files Created
- **`app/hooks/use-metamask.ts`** - MetaMask connection hook
- **`app/types/ethereum.d.ts`** - TypeScript declarations for window.ethereum

### Files Modified
- **`app/components/connect.tsx`** - Integrated MetaMask UI and logic

### Dependencies Added
- `ethers` (v6) - Ethereum interaction library

## Features

### MetaMask Hook (`use-metamask.ts`)
- Detects MetaMask installation
- Connects to MetaMask wallet
- Auto-switches to Moonbeam network (chainId: 1284)
- Adds Moonbeam network if not present
- Fetches user address and GLMR balance
- Persists connection in localStorage
- Listens for account/network changes
- Disconnect functionality

### Connect Component Updates
- Shows MetaMask option in wallet modal
- Displays "Ethereum Wallet (Moonbeam)" section
- MetaMask icon (🦊) with connection button
- Unified disconnect for both wallet types
- Shows connected wallet name in navbar
- Same onboarding flow for MetaMask users

## Moonbeam Network Details
- **Chain ID**: 1284 (0x504 in hex)
- **Native Token**: GLMR
- **RPC URL**: https://rpc.api.moonbeam.network
- **Explorer**: https://moonscan.io/

## User Experience

### For MetaMask Users
1. Click "Connect Wallet"
2. See MetaMask option at top of modal
3. Click to connect → MetaMask popup appears
4. Approve connection
5. MetaMask auto-switches to Moonbeam (or prompts to add network)
6. Address fetched → proceed to onboarding or dashboard

### For Polkadot Users
- Existing flow unchanged
- Polkadot wallets shown below MetaMask section

## Database Compatibility
- MetaMask addresses (Ethereum format: 0x...) stored in `walletAddress` field
- Same user profile structure for both wallet types
- Backend API handles both address formats

## Next Steps
1. Test MetaMask connection flow
2. Verify Moonbeam network switching
3. Test onboarding with MetaMask address
4. Implement USDC transfers on Moonbeam
5. Add Moonbeam testnet support (Moonbase Alpha)

## Testing
```bash
# Run dev server
npm run dev

# Test flow:
1. Install MetaMask browser extension
2. Navigate to PassaPay
3. Click "Connect Wallet"
4. Select MetaMask
5. Approve connection
6. Verify Moonbeam network switch
7. Complete onboarding
8. Check dashboard access
```

## Benefits
- **Dual Ecosystem Support**: Polkadot + Ethereum users
- **Wider Adoption**: MetaMask has 30M+ users
- **EVM Compatibility**: Leverage Ethereum tooling
- **Unified Experience**: Same flow for all wallet types
- **Moonbeam Bridge**: Access to both ecosystems
