# PassaPay MVP - Components & Pages Specification

## Overview
This document outlines all components and pages required for the PassaPay MVP, focusing on core payment functionality between artists and promoters.

## Pages Structure

### 1. Landing Page (`/`)
**Purpose**: Marketing page to introduce PassaPay and drive user registration
**Components Needed**:
- Hero section with value proposition
- Features showcase
- How it works section
- Call-to-action buttons
- Footer with links

### 2. Authentication Modal
**Purpose**: Capture user details after wallet connection
**Components Needed**:
- Wallet connection interface
- User registration form (name, email, role selection)
- Role selection: Artist or Promoter
- Terms & conditions acceptance
- Success/error states

### 3. Artist Dashboard (`/artist/dashboard`)
**Purpose**: Main interface for artists to view earnings and manage payments
**Components Needed**:
- Balance overview (USDC + native tokens)
- Recent transactions list
- Payment notifications
- Quick stats (total earned, pending payments)
- Navigation menu

### 4. Promoter Dashboard (`/promoter/dashboard`)
**Purpose**: Main interface for promoters to send payments and manage artists
**Components Needed**:
- Balance overview
- Quick send payment button
- Recent payments sent
- Artist contacts/favorites
- Payment analytics
- Navigation menu

### 5. Payment Form (`/send-payment`)
**Purpose**: Interface for promoters to send payments to artists
**Components Needed**:
- Recipient selection (search artists or manual address)
- Amount input with USD/USDC conversion
- Payment description/memo
- Transaction fee display
- Confirmation modal
- Success/error states

### 6. Transaction History (`/transactions`)
**Purpose**: Detailed view of all payment transactions
**Components Needed**:
- Transaction list with filters
- Search functionality
- Transaction details modal
- Export functionality
- Pagination
- Status indicators (pending, completed, failed)

### 7. Notifications Page (`/notifications`)
**Purpose**: View all payment notifications and system alerts
**Components Needed**:
- Notification list (payment received, sent, failed)
- Mark as read functionality
- Filter by type/date
- Real-time updates
- Clear all option

##  Reusable Components

### Core Components
- **WalletConnect**: Wallet connection and account management
- **BalanceCard**: Display token balances across chains
- **TransactionItem**: Individual transaction display
- **PaymentModal**: Payment confirmation dialog
- **NotificationItem**: Individual notification display
- **UserProfile**: User information display/edit
- **LoadingSpinner**: Loading states
- **ErrorBoundary**: Error handling
- **Toast**: Success/error messages

### Form Components
- **AmountInput**: Currency input with validation
- **AddressInput**: Wallet address input with validation
- **UserSearch**: Search and select users
- **RoleSelector**: Artist/Promoter selection

### Layout Components
- **Header**: Navigation and user menu
- **Sidebar**: Dashboard navigation
- **Footer**: Links and information
- **PageLayout**: Common page wrapper

##  User Flows

### Artist Flow
1. **Landing** → Connect Wallet → **Registration Modal** → **Artist Dashboard**
2. **Dashboard** → View balance, recent payments, notifications
3. **Transactions** → View detailed payment history
4. **Notifications** → Manage payment alerts

### Promoter Flow
1. **Landing** → Connect Wallet → **Registration Modal** → **Promoter Dashboard**
2. **Dashboard** → Quick overview, send payment button
3. **Send Payment** → Select artist, enter amount, confirm
4. **Transactions** → Track sent payments
5. **Notifications** → Payment confirmations and alerts

##  Responsive Design Requirements

### Mobile First
- All components must work on mobile (320px+)
- Touch-friendly buttons and inputs
- Simplified navigation for small screens
- Optimized forms for mobile keyboards

### Desktop Enhancements
- Multi-column layouts
- Hover states and tooltips
- Keyboard shortcuts
- Advanced filtering options

## Security Considerations

### Data Protection
- No sensitive data stored locally
- Wallet signatures for all transactions
- Input validation and sanitization
- Rate limiting for API calls

### User Safety
- Clear transaction confirmations
- Address validation
- Amount limits and warnings
- Phishing protection measures

## Analytics & Tracking

### User Events
- Wallet connections
- Payment completions
- Page views and navigation
- Error occurrences
- User registration by role

### Performance Metrics
- Page load times
- Transaction success rates
- User engagement metrics
- Conversion funnel analysis


##  Component Priority

### Phase 1 (MVP Core)
1. Landing Page
2. Authentication Modal
3. Basic Dashboards (Artist/Promoter)
4. Payment Form
5. Transaction History

### Phase 2 (Enhanced UX)
1. Advanced Notifications
2. User Search/Contacts
3. Payment Analytics
4. Mobile Optimizations

### Phase 3 (Advanced Features)
1. Bulk Payments
2. Recurring Payments
3. Advanced Filtering
4. Export Functionality

