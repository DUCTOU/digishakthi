import React from 'react';
import { Shield, Key } from 'lucide-react';

const Header = ({ isConnected, walletAddress, connectWallet, isLoading }) => {
  return (
    <header className="relative z-10 border-b border-orange-200/50 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield className="w-10 h-10 text-orange-600" strokeWidth={2} />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-600 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                Digital <span className="text-orange-600">Shakti</span>
              </h1>
              <p className="text-xs text-gray-500 tracking-wide">SWADESHI • ATMANIRBHAR BHARAT</p>
            </div>
          </div>

          {!isConnected ? (
            <button
              onClick={connectWallet}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold disabled:opacity-50"
            >
              <Key className="w-4 h-4" />
              Connect Wallet
            </button>
          ) : (
            <div className="flex items-center gap-3 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-mono text-gray-700">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
