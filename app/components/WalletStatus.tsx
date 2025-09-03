'use client';

import { useAccount } from 'wagmi';
import { useConnectWallet } from '@coinbase/onchainkit/wallet';
import { formatAddress } from '../utils/verification';

export default function WalletStatus() {
  const { isConnected, address } = useAccount();
  const { status: walletStatus } = useConnectWallet();

  return (
    <div className="mt-8 pt-6 border-t border-gray-700 text-sm">
      <h3 className="font-medium text-gray-400 mb-2">Wallet Status</h3>
      <div className="grid grid-cols-2 gap-2 text-gray-500">
        <div>Connection:</div>
        <div className="font-mono">
          {walletStatus === 'connecting' ? (
            <span className="text-yellow-500">Connecting...</span>
          ) : isConnected ? (
            <span className="text-green-500">Connected</span>
          ) : (
            <span className="text-red-500">Disconnected</span>
          )}
        </div>
        
        {address && (
          <>
            <div>Address:</div>
            <div className="font-mono truncate">{formatAddress(address)}</div>
            
            <div>Network:</div>
            <div className="font-mono">Base</div>
          </>
        )}
      </div>
    </div>
  );
}

