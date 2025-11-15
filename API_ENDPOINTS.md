# PassaPay API Endpoints - Complete Reference

## ✅ All Endpoints Are Live and Working

### 1. Users API (`/api/users`)

**GET** - Fetch user by wallet address
```typescript
GET /api/users?walletAddress=0x...

Response:
{
  "exists": true,
  "user": {
    "walletAddress": "0x...",
    "userType": "artist" | "promoter",
    "name": "John Doe",
    "email": "john@example.com",
    "country": "KE",
    "genre": "afrobeats", // artists only
    "organization": "Company", // promoters only
    "verified": false,
    "createdAt": "2025-01-15T10:00:00Z"
  }
}
```

**POST** - Create new user
```typescript
POST /api/users
Body: {
  "walletAddress": "0x...",
  "userType": "artist" | "promoter",
  "name": "John Doe",
  "email": "john@example.com",
  "country": "KE",
  "genre": "afrobeats" // optional
}
```

**PUT** - Update user profile
```typescript
PUT /api/users
Body: {
  "walletAddress": "0x...",
  "name": "Updated Name",
  "email": "new@email.com",
  "country": "NG"
}
```

---

### 2. Profiles API (`/api/profiles`)

**GET** - Fetch artist profile
```typescript
GET /api/profiles?userId=walletAddress

Response:
{
  "userId": "0x...",
  "name": "Artist Name",
  "genre": "afrobeats",
  "country": "KE",
  "verified": false,
  "createdAt": "2025-01-15T10:00:00Z"
}
```

**POST** - Create artist profile
```typescript
POST /api/profiles
Body: {
  "userId": "0x...",
  "name": "Artist Name",
  "genre": "afrobeats",
  "country": "KE"
}
```

**PUT** - Update artist profile
```typescript
PUT /api/profiles
Body: {
  "userId": "0x...",
  "name": "Updated Name",
  "genre": "hip-hop"
}
```

---

### 3. Transactions API (`/api/transactions`)

**GET** - Fetch transactions by address
```typescript
GET /api/transactions?address=0x...

Response: [
  {
    "_id": "...",
    "txHash": "0x...",
    "fromAddress": "0x...",
    "toAddress": "0x...",
    "amount": "1.5",
    "currency": "DEV",
    "type": "sent" | "received",
    "status": "completed" | "pending" | "failed",
    "chainId": "1287",
    "blockNumber": 12345,
    "timestamp": "2025-01-15T10:30:00Z",
    "createdAt": "2025-01-15T10:30:00Z"
  }
]
```

**POST** - Create transaction record
```typescript
POST /api/transactions
Body: {
  "txHash": "0x...",
  "fromAddress": "0x...",
  "toAddress": "0x...",
  "amount": "1.5",
  "currency": "DEV",
  "status": "pending",
  "chainId": "1287"
}
```

---

### 4. Notifications API (`/api/notifications`)

**GET** - Fetch user notifications
```typescript
GET /api/notifications?userId=0x...

Response: [
  {
    "_id": "...",
    "userId": "0x...",
    "walletAddress": "0x...",
    "type": "payment_received" | "payment_sent" | "info",
    "title": "Payment Received",
    "message": "You received 1.5 DEV",
    "read": false,
    "relatedTxId": "...",
    "timestamp": "2025-01-15T10:30:00Z",
    "createdAt": "2025-01-15T10:30:00Z"
  }
]
```

**POST** - Create notification
```typescript
POST /api/notifications
Body: {
  "userId": "0x...",
  "walletAddress": "0x...",
  "type": "payment_received",
  "title": "Payment Received",
  "message": "You received 1.5 DEV",
  "relatedTxId": "..."
}
```

**PATCH** - Mark notification as read
```typescript
PATCH /api/notifications
Body: {
  "notificationId": "..."
}
```

---

### 5. Health Check (`/api/health`)

**GET** - Check API status
```typescript
GET /api/health

Response:
{
  "status": "ok",
  "timestamp": "2025-01-15T10:00:00Z"
}
```

---

## Service Layer

All endpoints use service functions from `/app/lib/services/`:

### `user.service.ts`
- `createUser(data)`
- `getUserByWallet(address)`
- `updateUser(address, data)`
- `createArtistProfile(userId, data)`
- `getArtistProfile(userId)`
- `updateArtistProfile(userId, data)`

### `transaction.service.ts`
- `createTransaction(data)`
- `getTransactionsByAddress(address)`
- `updateTransactionStatus(txHash, status)`

### `notification.service.ts`
- `createNotification(data)`
- `getNotificationsByUser(userId)`
- `markAsRead(notificationId)`

---

## Database Models

### User Schema
```typescript
{
  walletAddress: String (unique, required)
  userType: 'artist' | 'promoter' (required)
  name: String (required)
  email: String (required)
  country: String (required)
  genre: String (optional - artists)
  organization: String (optional - promoters)
  verified: Boolean (default: false)
  createdAt: Date
}
```

### Transaction Schema
```typescript
{
  txHash: String (required)
  fromAddress: String (required)
  toAddress: String (required)
  amount: String (required)
  currency: String (default: 'DEV')
  type: 'sent' | 'received'
  status: 'completed' | 'pending' | 'failed'
  chainId: String
  blockNumber: Number
  timestamp: Date
  createdAt: Date
}
```

### Notification Schema
```typescript
{
  userId: String (required)
  walletAddress: String (required)
  type: 'payment_received' | 'payment_sent' | 'info'
  title: String (required)
  message: String (required)
  read: Boolean (default: false)
  relatedTxId: String (optional)
  timestamp: Date
  createdAt: Date
}
```

---

## Current Integration Status

### ✅ Working:
- User profile management (create, read, update)
- Transaction tracking (create, fetch by address)
- Notification system (create, fetch, mark as read)
- Artist dashboard (fetches real data)
- Promoter dashboard (fetches real data)
- Balance display (from blockchain)

### 🔄 Pending Contract Deployment:
- Smart contract payment creation
- Payment completion via contract
- Dispute handling
- Fee calculation

---

## Usage Examples

### Fetch Artist Transactions
```typescript
const response = await fetch(`/api/transactions?address=${artistAddress}`)
const transactions = await response.json()
const pending = transactions.filter(tx => tx.status === 'pending')
```

### Create Payment Notification
```typescript
await fetch('/api/notifications', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: artistAddress,
    walletAddress: artistAddress,
    type: 'payment_received',
    title: 'Payment Received',
    message: `You received ${amount} DEV from ${promoterAddress}`,
    relatedTxId: txHash
  })
})
```

### Update User Profile
```typescript
await fetch('/api/users', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    walletAddress: address,
    name: 'New Name',
    email: 'new@email.com'
  })
})
```

---

## Notes

- All endpoints support offline fallback via localStorage
- MongoDB connection is optional (graceful degradation)
- Transactions auto-refresh every 30 seconds in dashboards
- Profile updates sync to database when online
