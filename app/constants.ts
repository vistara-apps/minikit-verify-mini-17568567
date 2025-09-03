/**
 * Application constants
 */

/**
 * Base URL for the application
 */
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

/**
 * Application name
 */
export const APP_NAME = 'Minikit Verify';

/**
 * Application description
 */
export const APP_DESCRIPTION = 'Verify your identity with Minikit Verify, a Base Mini App built with OnchainKit';

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  VERIFICATION_DATA: 'minikit_verify_user',
};

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  VERIFY: '/api/verify',
  WEBHOOK: '/api/webhook',
};

/**
 * Theme colors
 */
export const COLORS = {
  PRIMARY: '#3B82F6', // Blue
  SECONDARY: '#10B981', // Green
  BACKGROUND: '#0F172A', // Dark Blue
  TEXT: '#F8FAFC', // White
  ACCENT: '#8B5CF6', // Purple
  ERROR: '#EF4444', // Red
  SUCCESS: '#10B981', // Green
  WARNING: '#F59E0B', // Yellow
};

/**
 * Verification message template
 */
export const VERIFICATION_MESSAGE_TEMPLATE = 'Verify your identity with Minikit Verify\nAddress: {address}\nTimestamp: {timestamp}';

/**
 * Timeouts (in milliseconds)
 */
export const TIMEOUTS = {
  VERIFICATION_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
};

