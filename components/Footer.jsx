import React from 'react';

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-gray-200 bg-white/50 backdrop-blur-sm mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600">
              Built for <span className="font-semibold text-orange-600">Atmanirbhar Bharat</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Powered by Polygon Amoy • IPFS • Solidity
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">256-bit</div>
              <div className="text-xs text-gray-500">SHA Hashing</div>
            </div>
            <div className="w-px h-10 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">Zero-Trust</div>
              <div className="text-xs text-gray-500">Client-Side</div>
            </div>
            <div className="w-px h-10 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">IPFS</div>
              <div className="text-xs text-gray-500">Decentralized</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
