import { NextRequest, NextResponse } from 'next/server';
import { verifyMessage } from 'viem';
import { generateUserId } from '@/app/utils/verification';
import { storeUserVerification, isAddressVerified } from '@/app/services/redis';
import { VerificationRequest, VerificationResponse } from '@/app/types';

/**
 * Verifies a user's identity through wallet signature
 * 
 * @param request The incoming request with signature data
 * @returns Verification status and user information
 */
export async function POST(request: NextRequest) {
  try {
    const { address, signature, message } = await request.json() as VerificationRequest;

    // Validate request parameters
    if (!address || !signature || !message) {
      return NextResponse.json<VerificationResponse>(
        { verified: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Check if address is already verified
    const existingUserId = await isAddressVerified(address);
    if (existingUserId) {
      return NextResponse.json<VerificationResponse>({
        verified: true,
        userId: existingUserId,
        timestamp: Date.now(),
      });
    }

    // Verify the signature
    const isValid = await verifyMessage({
      address: address as `0x${string}`,
      message,
      signature: signature as `0x${string}`,
    });

    if (!isValid) {
      return NextResponse.json<VerificationResponse>(
        { verified: false, error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Generate a unique user ID
    const userId = generateUserId(address);
    
    // Store verification data in Redis if available
    await storeUserVerification(userId, address);
    
    // Return successful verification response
    return NextResponse.json<VerificationResponse>({
      verified: true,
      userId,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json<VerificationResponse>(
      { verified: false, error: 'Verification failed', timestamp: Date.now() },
      { status: 500 }
    );
  }
}
