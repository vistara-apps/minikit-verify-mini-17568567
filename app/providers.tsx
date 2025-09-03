'use client';

import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { base } from 'viem/chains';
import { createConfig, http } from 'wagmi';
import { type ReactNode, useState } from 'react';

// Configure Wagmi with Base chain
const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  // Add additional configuration for better UX
  ssr: true,
  syncConnectedChain: true,
});

/**
 * Global providers for the application
 * 
 * Includes:
 * - WagmiProvider for blockchain interactions
 * - QueryClientProvider for data fetching
 * - OnchainKitProvider for Base Mini App functionality
 */
export function Providers(props: { children: ReactNode }) {
  // Initialize React Query client
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  }));

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={base}
          config={{
            appearance: {
              mode: 'dark',
              theme: 'default',
              name: 'Minikit Verify',
              accentColor: '#3B82F6', // Blue accent color
              borderRadius: 'md',
            },
            connect: {
              // Recommended wallets
              recommendedWallets: [
                'coinbase',
                'metamask',
                'rainbow',
                'walletconnect',
              ],
              // Customize connect modal
              modal: {
                title: 'Connect to Minikit Verify',
                description: 'Connect your wallet to verify your identity with Minikit Verify',
              },
            },
            // Customize notifications
            notifications: {
              enabled: true,
              position: 'bottom-right',
            },
          }}
        >
          {props.children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
