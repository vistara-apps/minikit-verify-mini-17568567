'use client';

import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import VerificationCard from './components/VerificationCard';
import WalletStatus from './components/WalletStatus';

/**
 * Home page component
 * 
 * Implements the main functionality of the Minikit Verify app:
 * - Wallet connection
 * - Identity verification
 * - Frame readiness for Base Mini App
 */
export default function Home() {
  const { setFrameReady } = useMiniKit();
  const { isConnected } = useAccount();

  // Set frame ready on component mount
  useEffect(() => {
    // This is required for Base Mini App functionality
    setFrameReady();
  }, [setFrameReady]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-900 text-white">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-xl shadow-lg">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 text-blue-400">Minikit Verify</h1>
          <p className="text-gray-400">Verify your identity with Base Mini App</p>
        </header>
        
        {/* Wallet Connection Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Connect Wallet</h2>
          <div className="flex justify-center">
            <ConnectWallet />
          </div>
        </section>

        {/* Verification Section - Only shown when wallet is connected */}
        {isConnected && <VerificationCard />}

        {/* Wallet Status Information */}
        <WalletStatus />
        
        {/* Footer */}
        <footer className="mt-8 pt-4 border-t border-gray-700 text-center text-xs text-gray-500">
          <p>Built with OnchainKit MiniKit</p>
          <p className="mt-1">© {new Date().getFullYear()} Vistara Apps</p>
        </footer>
      </div>
    </main>
  );
}
