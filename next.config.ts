import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['polkadot-api'],
  turbopack: {
    resolveAlias: {
      crypto: 'crypto-browserify',
    },
  },
};

export default nextConfig;
