import React from 'react';
import { FileText, CheckCircle, ExternalLink, RefreshCw } from 'lucide-react';

const EvidenceList = ({ evidence, isLoading, verifyEvidence }) => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 bg-gradient-to-br from-orange-50 to-green-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                Evidence Vault
              </h2>
              <p className="text-sm text-gray-600">Immutable digital records</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-gray-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-gray-700">POLYGON AMOY</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {evidence.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2 font-semibold">No evidence stored yet</p>
              <p className="text-sm text-gray-400">Start by capturing or uploading your first piece of evidence</p>
            </div>
          ) : (
            <div className="space-y-4">
              {evidence.map((item, index) => (
                <div
                  key={item.id || index}
                  className="p-5 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-green-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {new Date(item.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                      <CheckCircle className="w-3 h-3" />
                      Anchored
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-start gap-2">
                      <span className="text-xs text-gray-500 min-w-20">File Hash:</span>
                      <span className="text-xs font-mono text-gray-700 break-all">{item.hash}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs text-gray-500 min-w-20">IPFS CID:</span>
                      <a
                        href={`https://gateway.pinata.cloud/ipfs/${item.ipfsCID}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-blue-600 break-all hover:underline flex items-center gap-1"
                      >
                        {item.ipfsCID}
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                    </div>
                    {item.txHash && (
                      <div className="flex items-start gap-2">
                        <span className="text-xs text-gray-500 min-w-20">Tx Hash:</span>
                        <a
                          href={`https://amoy.polygonscan.com/tx/${item.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-blue-600 break-all hover:underline flex items-center gap-1"
                        >
                          {item.txHash.slice(0, 16)}...{item.txHash.slice(-8)}
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        </a>
                      </div>
                    )}
                    {item.location && (
                      <div className="flex items-start gap-2">
                        <span className="text-xs text-gray-500 min-w-20">Location:</span>
                        <span className="text-xs font-mono text-gray-700">
                          {item.location.lat.toFixed(4)}, {item.location.lng.toFixed(4)}
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => verifyEvidence(item)}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-semibold disabled:opacity-50"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Verify on Blockchain
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EvidenceList;
