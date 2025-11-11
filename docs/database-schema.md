# PassaPay Database Schema Documentation

## Overview

PassaPay uses MongoDB with Mongoose ODM for flexible, scalable data storage. The schema design prioritizes simplicity, performance, and the ability to handle cross-border payment workflows for artists and promoters.

## Schema Design Principles

1. **Wallet-centric authentication** - Users are identified by blockchain wallet addresses
2. **Flexible user types** - Support for both artists and promoters with type-specific fields
3. **Transaction immutability** - Payment records are append-only for audit trails
4. **Real-time notifications** - Event-driven notification system for payment alerts
5. **Offline-first** - Schema supports sync queue for offline operations

---

## Collections

### 1. Users Collection

**Purpose**: Store user profiles for both artists and promoters

```typescript
{
  walletAddress: String (unique, required)  // Blockchain wallet address
  userType: String (enum: ['artist', 'promoter'], required)
  name: String (required)                   // Full name or stage name
  email: String (required)                  // Contact email
  country: String (required)                // ISO country code
  genre: String (optional)                  // For artists only
  organization: String (optional)           // For promoters only
  verified: Boolean (default: false)        // KYC verification status
  createdAt: Date (default: now)
}
```

**Justification**:
- `walletAddress` as unique identifier eliminates need for traditional passwords
- `userType` enum allows role-based features without separate tables
- Optional fields (`genre`, `organization`) provide flexibility without null values
- `verified` flag enables future KYC/compliance features
- Single collection reduces joins and improves query performance

**Indexes**:
- `walletAddress` (unique) - Fast user lookup by wallet
- `email` - Support for email-based searches
- `userType` - Filter by role

---

### 2. Transactions Collection

**Purpose**: Immutable record of all USDC payments between users

```typescript
{
  txHash: String (required)                 // Blockchain transaction hash
  fromAddress: String (required)            // Sender wallet address
  toAddress: String (required)              // Recipient wallet address
  amount: String (required)                 // USDC amount (stored as string for precision)
  status: String (enum: ['pending', 'completed', 'failed'])
  timestamp: Date (required)                // Transaction timestamp
  createdAt: Date (default: now)
}
```

**Justification**:
- `txHash` links to on-chain transaction for verification
- `amount` as String prevents floating-point precision issues
- `fromAddress`/`toAddress` enable bidirectional queries (sent/received)
- `status` tracks transaction lifecycle
- No update operations - transactions are append-only for audit compliance

**Indexes**:
- `txHash` (unique) - Prevent duplicate transaction records
- `fromAddress` - Query sent payments
- `toAddress` - Query received payments
- `timestamp` (descending) - Recent transactions first

---

### 3. Notifications Collection

**Purpose**: Real-time alerts for payment events

```typescript
{
  userId: String (required)                 // Recipient wallet address
  type: String (required)                   // Notification type
  title: String (required)                  // Notification headline
  message: String (required)                // Notification body
  read: Boolean (default: false)            // Read status
  createdAt: Date (default: now)
}
```

**Justification**:
- `userId` references wallet address (denormalized for performance)
- `type` enables filtering by notification category
- `read` flag supports unread count badges
- Lightweight schema for high-volume inserts
- TTL index can auto-delete old notifications

**Indexes**:
- `userId` + `createdAt` (compound, descending) - User's recent notifications
- `read` - Filter unread notifications

---

### 4. Artist Profiles Collection

**Purpose**: Extended profile data for verified artists

```typescript
{
  userId: String (required)                 // References User.walletAddress
  name: String (required)                   // Artist stage name
  genre: String (required)                  // Music genre
  country: String (required)                // Home country
  verified: Boolean (default: false)        // Verification status
  createdAt: Date (default: now)
  updatedAt: Date (default: now)
}
```

**Justification**:
- Separate collection for artist-specific data (normalized design)
- Enables rich artist profiles without bloating Users collection
- `verified` supports artist verification workflow
- `updatedAt` tracks profile modifications

**Indexes**:
- `userId` (unique) - One profile per artist
- `genre` - Browse artists by genre
- `country` - Regional artist discovery

---

## Design Decisions

### Why MongoDB over PostgreSQL?

1. **Flexible schema** - User types have different fields (genre vs organization)
2. **Horizontal scaling** - MongoDB sharding for global user base
3. **JSON-native** - Direct mapping to TypeScript interfaces
4. **Blockchain integration** - Store transaction hashes and wallet addresses naturally
5. **Rapid iteration** - Schema changes don't require migrations

### Why Mongoose over Native Driver?

1. **Type safety** - Schema validation at application level
2. **Middleware hooks** - Pre/post save hooks for business logic
3. **Query builder** - Cleaner, more maintainable queries
4. **Connection pooling** - Built-in connection management
5. **Virtuals and methods** - Extend documents with computed properties

### Denormalization Strategy

- **Transactions** store wallet addresses (not user IDs) for blockchain consistency
- **Notifications** duplicate user data to avoid joins on high-frequency reads
- Trade-off: Slight data duplication for 10x query performance

### Data Integrity

- **Unique indexes** prevent duplicate users and transactions
- **Enum validation** ensures data consistency
- **Required fields** enforce business rules at database level
- **Timestamps** provide audit trail for all records

---

## Future Enhancements

1. **Payment metadata** - Add `memo` field to Transactions for payment notes
2. **Multi-currency** - Extend Transactions with `currency` field
3. **Artist ratings** - New collection for promoter reviews
4. **Bulk payments** - `BatchTransactions` collection for multiple recipients
5. **Tax withholding** - Add `taxRate` and `taxAmount` to Transactions

---

## Migration Strategy

Current schema supports backward-compatible changes:
- New optional fields can be added without data migration
- Indexes can be created on existing collections
- Collections can be split (e.g., separate Promoter profiles) without breaking changes

## Performance Considerations

- **Connection caching** - Reuse MongoDB connections across requests
- **Lean queries** - Use `.lean()` for read-only operations
- **Projection** - Select only needed fields to reduce bandwidth
- **Pagination** - Limit query results for large collections
- **Aggregation pipeline** - Use for complex analytics queries
