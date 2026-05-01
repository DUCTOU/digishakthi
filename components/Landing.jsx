import React from 'react';
import { Lock, Shield, CheckCircle } from 'lucide-react';

const Landing = () => {
  return (
    <div className="text-center py-20">
      <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-100 to-green-100 rounded-full mb-6">
        <Lock className="w-12 h-12 text-orange-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
        Secure Evidence Locker
      </h2>
      <p className="text-gray-600 max-w-lg mx-auto mb-8">
        Connect your MetaMask wallet to start storing tamper-proof digital evidence on the blockchain. 
        Powered by Polygon Amoy Testnet &amp; IPFS.
      </p>
      <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
        <div className="p-6 bg-white rounded-xl border border-orange-200/50 shadow-sm">
          <Shield className="w-8 h-8 text-orange-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-1">Zero-Trust</h3>
          <p className="text-sm text-gray-600">Client-side hashing</p>
        </div>
        <div className="p-6 bg-white rounded-xl border border-orange-200/50 shadow-sm">
          <Lock className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-1">Immutable</h3>
          <p className="text-sm text-gray-600">Blockchain anchored</p>
        </div>
        <div className="p-6 bg-white rounded-xl border border-orange-200/50 shadow-sm">
          <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-1">Verifiable</h3>
          <p className="text-sm text-gray-600">Cryptographic proof</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
