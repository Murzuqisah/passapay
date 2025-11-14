import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const config = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      '.env*',
      '*.d.ts',
      '!app/**/*.d.ts',
      'dist/**',
      'build/**',
      '*.log',
      '.DS_Store',
      'Thumbs.db',
      'app/descriptors/**'
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default config;
