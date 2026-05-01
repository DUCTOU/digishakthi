import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const VerificationModal = ({ verificationResult, setVerificationResult }) => {
  if (!verificationResult) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-6">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            verificationResult.match ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {verificationResult.match 
              ? <CheckCircle className="w-10 h-10 text-green-600" />
              : <XCircle className="w-10 h-10 text-red-600" />
            }
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            {verificationResult.match ? 'Verification Successful' : 'Verification Failed'}
          </h3>
          <p className="text-gray-600">
            {verificationResult.match ? 'Evidence integrity confirmed' : 'Hash mismatch detected — evidence may be tampered'}
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Local Hash</p>
            <p className="text-xs font-mono text-gray-700 break-all">{verificationResult.hash}</p>
          </div>
          <div className={`p-4 rounded-lg border ${verificationResult.match ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <p className="text-xs text-gray-500 mb-1">Blockchain Hash</p>
            <p className="text-xs font-mono text-gray-700 break-all">{verificationResult.blockchainHash}</p>
          </div>
          {verificationResult.timestamp && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Stored On</p>
              <p className="text-xs font-mono text-gray-700">{verificationResult.timestamp}</p>
            </div>
          )}
          <div className={`flex items-center justify-center gap-2 font-semibold ${verificationResult.match ? 'text-green-600' : 'text-red-600'}`}>
            {verificationResult.match ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            <span>{verificationResult.match ? 'Hashes Match — Evidence Verified' : 'Hashes Do Not Match'}</span>
          </div>
        </div>

        <button
          onClick={() => setVerificationResult(null)}
          className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default VerificationModal;
