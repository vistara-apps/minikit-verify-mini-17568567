    'use client';

    import { useMiniKit } from '@coinbase/onchainkit/minikit';
    import { ConnectWallet } from '@coinbase/onchainkit/wallet';
    import { useEffect } from 'react';

    export default function Home() {
      const { setFrameReady } = useMiniKit();

      useEffect(() => {
        setFrameReady();
      }, [setFrameReady]);

      return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
          <h1 className="text-2xl font-bold mb-4">Base Mini App Scaffold</h1>
          <div>
            <ConnectWallet />
          </div>
        </main>
      );
    }
  