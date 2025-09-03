# Minikit Verify

Minikit Verify is a Base Mini App built with Next.js and OnchainKit MiniKit. This application serves as a verification tool for Base Mini Apps, demonstrating the integration of ConnectWallet and useMiniKit setFrameReady functionality.

## Technical Specifications

### Architecture

- **Frontend Framework**: Next.js 15.3.3
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Blockchain Integration**: 
  - OnchainKit MiniKit
  - Wagmi
  - Viem
- **Deployment**: Vercel

### Key Components

1. **ConnectWallet**: Provides wallet connection functionality for users to connect their Ethereum wallets.
2. **MiniKit Integration**: Uses the useMiniKit hook to enable frame readiness for Base Mini Apps.
3. **Providers**: Configures the application with necessary providers for blockchain interaction.
4. **API Layer**: Includes webhook endpoints for Farcaster frame interactions.

### Performance Requirements

- Initial load time < 2 seconds
- Responsive design for all device sizes
- Optimized asset loading

### Security Considerations

- No sensitive data stored in client-side code
- Environment variables for API keys
- Secure connection to blockchain networks

## API Documentation

### Endpoints

#### 1. Webhook API

```
POST /api/webhook
```

**Purpose**: Handles Farcaster frame interactions.

**Request Body**:
```json
{
  "untrustedData": {
    "fid": number,
    "url": string,
    "messageHash": string,
    "timestamp": number,
    "network": number,
    "buttonIndex": number,
    "inputText": string,
    "castId": {
      "fid": number,
      "hash": string
    }
  },
  "trustedData": {
    "messageBytes": string
  }
}
```

**Response**:
```json
{
  "status": "success",
  "message": "Webhook processed successfully"
}
```

#### 2. User Verification API

```
POST /api/verify
```

**Purpose**: Verifies user identity through wallet signature.

**Request Body**:
```json
{
  "address": string,
  "signature": string,
  "message": string
}
```

**Response**:
```json
{
  "verified": boolean,
  "userId": string,
  "timestamp": number
}
```

## UI/UX Requirements

### Design System

- **Color Palette**:
  - Primary: #3B82F6 (Blue)
  - Secondary: #10B981 (Green)
  - Background: #0F172A (Dark Blue)
  - Text: #F8FAFC (White)
  - Accent: #8B5CF6 (Purple)

- **Typography**:
  - Headings: Inter, sans-serif
  - Body: Inter, sans-serif
  - Code: Fira Code, monospace

- **Components**:
  - Buttons: Rounded with hover effects
  - Cards: Subtle shadows with rounded corners
  - Inputs: Minimal design with clear focus states

### User Flows

1. **Connection Flow**:
   - User lands on homepage
   - User clicks "Connect Wallet"
   - User selects wallet provider
   - User approves connection
   - UI updates to show connected state

2. **Verification Flow**:
   - Connected user clicks "Verify"
   - User signs message with wallet
   - System verifies signature
   - User receives verification status
   - Verified status is displayed

## Business Logic

- **User Authentication**: Wallet-based authentication using Ethereum signatures
- **Verification Process**: Multi-step verification to ensure user identity
- **Data Storage**: Temporary session storage with optional persistent storage
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Analytics**: Basic usage analytics to track user engagement

## Development and Deployment

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Production Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: API key for OnchainKit services
- `UPSTASH_REDIS_REST_URL`: URL for Redis database (optional)
- `UPSTASH_REDIS_REST_TOKEN`: Authentication token for Redis (optional)

## Testing Strategy

- **Unit Tests**: Component-level testing with Jest and React Testing Library
- **Integration Tests**: API endpoint testing
- **E2E Tests**: User flow testing with Cypress
- **Performance Testing**: Lighthouse audits for performance metrics

## Maintenance and Support

- Regular dependency updates
- Monitoring for performance issues
- User feedback collection
- Quarterly feature reviews

