/**
 * Tests for verification utilities
 * 
 * To run these tests:
 * 1. Install Jest: npm install --save-dev jest
 * 2. Add test script to package.json: "test": "jest"
 * 3. Run: npm test
 */

const {
  generateVerificationMessage,
  generateUserId,
  isValidAddress,
  formatAddress,
} = require('./verification');

describe('Verification Utilities', () => {
  describe('generateVerificationMessage', () => {
    it('should generate a message with address and timestamp', () => {
      const address = '0x1234567890abcdef1234567890abcdef12345678';
      const message = generateVerificationMessage(address);
      
      expect(message).toContain('Verify your identity with Minikit Verify');
      expect(message).toContain(`Address: ${address}`);
      expect(message).toContain('Timestamp:');
    });

    it('should return empty string for undefined address', () => {
      const message = generateVerificationMessage(undefined);
      expect(message).toBe('');
    });
  });

  describe('generateUserId', () => {
    it('should generate a user ID from an address', () => {
      const address = '0x1234567890abcdef1234567890abcdef12345678';
      const userId = generateUserId(address);
      
      expect(userId).toBe('user_12345678');
    });
  });

  describe('isValidAddress', () => {
    it('should validate correct Ethereum addresses', () => {
      const validAddress = '0x1234567890abcdef1234567890abcdef12345678';
      expect(isValidAddress(validAddress)).toBe(true);
    });

    it('should reject invalid Ethereum addresses', () => {
      const invalidAddresses = [
        '0x123', // too short
        '0xGGGG567890abcdef1234567890abcdef12345678', // invalid characters
        '1234567890abcdef1234567890abcdef12345678', // missing 0x prefix
      ];
      
      invalidAddresses.forEach(address => {
        expect(isValidAddress(address)).toBe(false);
      });
    });
  });

  describe('formatAddress', () => {
    it('should format an address for display', () => {
      const address = '0x1234567890abcdef1234567890abcdef12345678';
      const formatted = formatAddress(address);
      
      expect(formatted).toBe('0x1234...5678');
    });

    it('should return empty string for undefined address', () => {
      const formatted = formatAddress(undefined);
      expect(formatted).toBe('');
    });
  });
});

