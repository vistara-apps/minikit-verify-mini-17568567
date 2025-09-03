/**
 * Type definitions for the Minikit Verify application
 */

/**
 * Verification status enum
 */
export type VerificationStatus = 'idle' | 'pending' | 'success' | 'error';

/**
 * User verification data
 */
export interface VerificationData {
  userId: string;
  address: string;
  verifiedAt: number;
}

/**
 * Verification API request
 */
export interface VerificationRequest {
  address: string;
  signature: string;
  message: string;
}

/**
 * Verification API response
 */
export interface VerificationResponse {
  verified: boolean;
  userId?: string;
  timestamp?: number;
  error?: string;
}

/**
 * Webhook API request from Farcaster
 */
export interface WebhookRequest {
  untrustedData: {
    fid: number;
    url: string;
    messageHash: string;
    timestamp: number;
    network: number;
    buttonIndex: number;
    inputText?: string;
    castId: {
      fid: number;
      hash: string;
    };
  };
  trustedData: {
    messageBytes: string;
  };
}

/**
 * Webhook API response
 */
export interface WebhookResponse {
  status: 'success' | 'error';
  message: string;
}

