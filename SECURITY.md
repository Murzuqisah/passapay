# Security Policy

## Supported Versions

PassaPay is currently in active development. Security updates are provided for the following versions:

| Version | Supported          | Status |
| ------- | ------------------ | ------ |
| 0.1.x   | :white_check_mark: | Current development version |
| < 0.1   | :x:                | Pre-release, not supported |

## Security Considerations

PassaPay handles sensitive financial and blockchain data. Key security areas include:

### Blockchain Security

- **Wallet Integration**: Secure wallet connection via Talisman Connect
- **Transaction Signing**: All transactions require user wallet signatures
- **Private Key Management**: No private keys stored on our servers
- **Polkadot Network**: Built on secure Polkadot blockchain infrastructure

### Data Protection

- **Personal Information**: Artist profiles and payment data
- **Financial Data**: Transaction amounts and wallet addresses
- **Input Validation**: All user inputs validated with Zod schemas
- **Database Security**: MongoDB with proper access controls

### Application Security

- **Authentication**: Wallet-based authentication system
- **Authorization**: Role-based access (artists vs promoters)
- **HTTPS**: All communications encrypted in transit
- **Input Sanitization**: Protection against XSS and injection attacks

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please follow these steps:

### How to Report

1. **Email**: Send details to <security@passapay.com>
2. **GitHub**: Create a private security advisory
3. **Direct Contact**: Reach out to @hezronokwach on GitHub

### What to Include

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Suggested fix (if available)

### Response Timeline

- **Initial Response**: Within 24 hours
- **Status Updates**: Every 72 hours until resolved
- **Resolution Target**: Critical issues within 7 days, others within 30 days

### Disclosure Policy

- We follow responsible disclosure practices
- Public disclosure after fix is deployed
- Credit given to security researchers (if desired)
- No legal action against good-faith security research

## Security Best Practices

### For Users

- Keep wallet software updated
- Verify transaction details before signing
- Use strong, unique passwords
- Enable two-factor authentication where available

### For Developers

- Regular dependency updates via Dependabot
- Code review required for all changes
- Security-focused linting rules
- Regular security audits of smart contracts

## Bug Bounty Program

Currently, PassaPay does not have a formal bug bounty program. However, we appreciate security research and may provide recognition or rewards for significant findings on a case-by-case basis.

## Contact

For security-related questions or concerns:

- **Security Team**: <security@passapay.com>
- **General Contact**: <support@passapay.com>
- **GitHub**: @hezronokwach

## Compliance

PassaPay is designed with compliance in mind:

- GDPR considerations for EU users
- Financial regulations awareness
- Blockchain compliance best practices
- Regular security assessments
