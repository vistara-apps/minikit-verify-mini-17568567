'use client';

import { useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { 
  generateVerificationMessage, 
  formatAddress, 
  storeVerificationData 
} from '../utils/verification';

type VerificationStatus = 'idle' | 'pending' | 'success' | 'error';

export default function VerificationCard() {
  const { address } = useAccount();
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('idle');
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Create a unique message for the user to sign
  const message = generateVerificationMessage(address);

  // Set up the sign message hook
  const { signMessage } = useSignMessage({
    message,
    onSuccess: async (signature) => {
      try {
        // Call our verification API
        const response = await fetch('/api/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address,
            signature,
            message,
          }),
        });

        const data = await response.json();

        if (data.verified) {
          setVerificationStatus('success');
          setUserId(data.userId);
          
          // Store verification data
          if (address) {
            storeVerificationData(data.userId, address);
          }
        } else {
          setVerificationStatus('error');
          setError(data.error || 'Verification failed');
        }
      } catch (err) {
        setVerificationStatus('error');
        setError('An error occurred during verification');
        console.error(err);
      }
    },
    onError: (err) => {
      setVerificationStatus('error');
      setError(err.message || 'Failed to sign message');
    },
  });

  // Handle verification request
  const handleVerify = () => {
    setVerificationStatus('pending');
    signMessage();
  };

  return (
    <div className="border-t border-gray-700 pt-6">
      <h2 className="text-xl font-semibold mb-4">Verification</h2>
      
      {verificationStatus === 'idle' && (
        <div className="text-center">
          <p className="mb-4 text-gray-300">
            Click the button below to verify your identity by signing a message with your wallet.
          </p>
          <p className="mb-6 text-sm text-gray-500">
            Address: {formatAddress(address)}
          </p>
          <button
            onClick={handleVerify}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Verify Identity
          </button>
        </div>
      )}

      {verificationStatus === 'pending' && (
        <div className="text-center">
          <p className="mb-4 text-gray-300">Please sign the message in your wallet...</p>
          <div className="animate-pulse flex justify-center">
            <div className="h-8 w-8 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      )}

      {verificationStatus === 'success' && (
        <div className="text-center">
          <div className="bg-green-900/30 border border-green-500 rounded-lg p-4 mb-4">
            <p className="text-green-400 font-semibold">✓ Verification Successful</p>
            <p className="text-gray-300 text-sm mt-2">User ID: {userId}</p>
            <p className="text-gray-400 text-xs mt-1">Wallet: {formatAddress(address)}</p>
          </div>
          <button
            onClick={() => setVerificationStatus('idle')}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Verify Again
          </button>
        </div>
      )}

      {verificationStatus === 'error' && (
        <div className="text-center">
          <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 mb-4">
            <p className="text-red-400 font-semibold">✗ Verification Failed</p>
            <p className="text-gray-300 text-sm mt-2">{error}</p>
          </div>
          <button
            onClick={() => setVerificationStatus('idle')}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

