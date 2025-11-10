# PassaPay

**Cross-border payments for artists — simplified.**

A modern **Next.js 15 + TypeScript + React 19** application built on Polkadot that enables artists performing abroad to receive instant payments and convert them to their home currency without intermediaries, escrow, or holding periods.

## Mission

Enable artists to receive instant, low-cost cross-border payments through blockchain technology, eliminating traditional banking delays and high fees.

## Features

### Core Payment Features
- **Instant Payments** - Direct wallet-to-wallet transfers in stablecoins (USDC)
- **Low Fees** - Minimal transaction costs vs traditional wire transfers
- **Global Access** - No traditional banking infrastructure required
- **Transparent** - Full blockchain verification and transaction history
- **Secure** - Wallet signatures and blockchain-based security

### Technical Stack
- **Next.js 15** with App Router and Turbopack
- **React 19** for modern UI development
- **TypeScript** for type safety
- **PAPI SDK** integration for Polkadot blockchain interaction
- **TailwindCSS 4 + DaisyUI** for beautiful UI components
- **Wallet Connection** support via Talisman Connect
- Pre-configured for **multiple Polkadot chains**

## SDK Information

This template uses **PAPI (Polkadot API)** - a modern, type-safe SDK for interacting with Polkadot-based blockchains.

**PAPI Documentation**: https://papi.how/

### Configuration Files:
- **`app/utils/sdk.ts`** - Configures which chains to connect to and manages chain endpoints. You can modify supported networks and RPC providers here.
- **`app/utils/sdk-interface.ts`** - Provides high-level functions for onchain SDK calls.

## How It Works

### 1. Payment Process
- Promoter logs into platform and initiates payment
- Selects artist from verified list or enters wallet address
- Enters payment amount in USD
- Confirms payment through wallet signature
- Payment in stablecoins goes directly to artist's digital wallet

### 2. Instant Access
- Artist receives real-time notification
- Dashboard updates with new balance
- Full transaction history and blockchain verification

### 3. Future: Currency Conversion
- Convert earnings to local currency (KES, NGN, etc.)
- Withdraw via M-Pesa or bank transfer

## Supported Chains

Pre-configured for:
- **Polkadot** (DOT) - Main network
- **Polkadot Asset Hub** - Asset management and stablecoin transfers
- **Paseo** (PAS) - Testnet
- **Paseo Asset Hub** - Testnet asset management

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Project Structure

```
app/
├── components/     # React components
├── hooks/          # Custom React hooks
├── utils/          # Utility functions and SDK setup
├── globals.css     # Global styles
├── layout.tsx      # Root layout component
└── page.tsx        # Main page component
```

## Adding Custom Networks

### Step 1: Generate Chain Descriptors

PAPI requires type descriptors for each chain. Generate them using the PAPI CLI:

```bash
# Add a new chain using a WebSocket endpoint
npx papi add your_chain -w wss://your-rpc-endpoint.io

# Or use a well-known chain name
npx papi add kusama -n ksmcc3

# Generate descriptors (automatically runs on postinstall)
npx papi
```

This creates type-safe descriptors in `@polkadot-api/descriptors` that you can import.

### Step 2: Configure Your Chain

Edit `app/utils/sdk.ts` to add your chain configuration:

```typescript
import { yourChain } from '@polkadot-api/descriptors'

const CONFIG = {
  // ... existing chains
  your_chain: {
    descriptor: yourChain,
    providers: ['wss://your-rpc-endpoint.io'],
  },
}
```

You can add multiple RPC endpoints for fallback support:

```typescript
const CONFIG = {
  dot: {
    descriptor: polkadot,
    providers: [
      'wss://rpc.polkadot.io',
      'wss://polkadot-rpc.dwellir.com'
    ],
  },
}
```

For more details, see the [PAPI Codegen documentation](https://papi.how/codegen).

## Example Scenario

**Kenyan Artist in Nigeria:**
1. Bien performs in Lagos
2. Promoter sends $5,000 in USDC instantly
3. Bien's wallet receives it immediately
4. *(Future)* Converts to KES and withdraws to M-Pesa

## Roadmap

### MVP (Current)
- Account creation and wallet setup
- Peer-to-peer payment functionality
- Transaction tracking and history
- Smart contract-based transfers
- Basic security features

### Future Enhancements
- Fiat on/off-ramp integrations
- Multi-currency support
- Automated tax withholding
- Bulk payment options
- Advanced compliance features

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [PAPI Documentation](https://papi.how/)
- [Polkadot Developer Portal](https://wiki.polkadot.network/)
- [Polkadot Asset Hub](https://wiki.polkadot.network/docs/learn-assets)
