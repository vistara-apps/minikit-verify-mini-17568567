import { Redis } from '@upstash/redis';
import { VerificationData } from '../types';

/**
 * Redis client for data storage
 * 
 * Only initialized if environment variables are set
 */
let redis: Redis | null = null;

// Initialize Redis client if environment variables are set
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

/**
 * Stores user verification data in Redis
 * 
 * @param userId User's unique ID
 * @param address User's wallet address
 * @param expiryInSeconds Time until the data expires (default: 24 hours)
 * @returns Boolean indicating if the operation was successful
 */
export async function storeUserVerification(
  userId: string,
  address: string,
  expiryInSeconds = 86400 // 24 hours
): Promise<boolean> {
  if (!redis) return false;

  try {
    const data: VerificationData = {
      userId,
      address,
      verifiedAt: Date.now(),
    };

    await redis.set(`user:${userId}`, JSON.stringify(data), { ex: expiryInSeconds });
    await redis.set(`address:${address.toLowerCase()}`, userId, { ex: expiryInSeconds });
    
    return true;
  } catch (error) {
    console.error('Failed to store user verification in Redis:', error);
    return false;
  }
}

/**
 * Retrieves user verification data from Redis
 * 
 * @param userId User's unique ID
 * @returns User verification data or null if not found
 */
export async function getUserVerification(userId: string): Promise<VerificationData | null> {
  if (!redis) return null;

  try {
    const data = await redis.get<string>(`user:${userId}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to retrieve user verification from Redis:', error);
    return null;
  }
}

/**
 * Checks if an address has been verified
 * 
 * @param address User's wallet address
 * @returns User ID if verified, null otherwise
 */
export async function isAddressVerified(address: string): Promise<string | null> {
  if (!redis) return null;

  try {
    return await redis.get<string>(`address:${address.toLowerCase()}`);
  } catch (error) {
    console.error('Failed to check address verification in Redis:', error);
    return null;
  }
}

/**
 * Removes user verification data from Redis
 * 
 * @param userId User's unique ID
 * @param address User's wallet address
 * @returns Boolean indicating if the operation was successful
 */
export async function removeUserVerification(userId: string, address: string): Promise<boolean> {
  if (!redis) return false;

  try {
    await redis.del(`user:${userId}`);
    await redis.del(`address:${address.toLowerCase()}`);
    return true;
  } catch (error) {
    console.error('Failed to remove user verification from Redis:', error);
    return false;
  }
}

