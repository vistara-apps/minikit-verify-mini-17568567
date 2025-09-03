/**
 * Utility functions for user verification
 */

/**
 * Generates a unique message for the user to sign
 * 
 * @param address User's wallet address
 * @returns A formatted message string
 */
export function generateVerificationMessage(address: string | undefined): string {
  if (!address) return '';
  
  const timestamp = Date.now();
  return `Verify your identity with Minikit Verify\nAddress: ${address}\nTimestamp: ${timestamp}`;
}

/**
 * Generates a user ID from a wallet address
 * 
 * @param address User's wallet address
 * @returns A unique user ID
 */
export function generateUserId(address: string): string {
  return `user_${address.toLowerCase().substring(2, 10)}`;
}

/**
 * Validates a wallet address format
 * 
 * @param address Address to validate
 * @returns Boolean indicating if the address is valid
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Formats an address for display
 * 
 * @param address Full wallet address
 * @returns Shortened address (e.g., 0x1234...5678)
 */
export function formatAddress(address: string | undefined): string {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

/**
 * Stores verification data in localStorage
 * 
 * @param userId User's unique ID
 * @param address User's wallet address
 */
export function storeVerificationData(userId: string, address: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('minikit_verify_user', JSON.stringify({
      userId,
      address,
      verifiedAt: Date.now(),
    }));
  } catch (error) {
    console.error('Failed to store verification data:', error);
  }
}

/**
 * Retrieves stored verification data
 * 
 * @returns Stored verification data or null if not found
 */
export function getStoredVerificationData(): { userId: string; address: string; verifiedAt: number } | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const data = localStorage.getItem('minikit_verify_user');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to retrieve verification data:', error);
    return null;
  }
}

/**
 * Clears stored verification data
 */
export function clearVerificationData(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('minikit_verify_user');
  } catch (error) {
    console.error('Failed to clear verification data:', error);
  }
}

