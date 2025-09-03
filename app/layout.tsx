'use client';

import { Providers } from './providers';
import './globals.css';
import { Metadata } from 'next';

// Define metadata for the application
export const metadata: Metadata = {
  title: 'Minikit Verify | Base Mini App',
  description: 'Verify your identity with Minikit Verify, a Base Mini App built with OnchainKit',
  keywords: ['base', 'miniapp', 'onchainkit', 'verification', 'blockchain', 'web3'],
  authors: [{ name: 'Vistara Apps' }],
  openGraph: {
    title: 'Minikit Verify | Base Mini App',
    description: 'Verify your identity with Minikit Verify, a Base Mini App built with OnchainKit',
    url: 'https://minikit-verify.vistara.dev',
    siteName: 'Minikit Verify',
    images: [
      {
        url: 'https://minikit-verify.vistara.dev/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Minikit Verify',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Minikit Verify | Base Mini App',
    description: 'Verify your identity with Minikit Verify, a Base Mini App built with OnchainKit',
    images: ['https://minikit-verify.vistara.dev/og-image.png'],
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#0F172A',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="bg-gray-900 text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
