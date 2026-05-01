import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingOverlay = ({ isLoading, loadingMessage, uploadProgress }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[60]">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl text-center">
        <Loader2 className="w-12 h-12 text-orange-600 mx-auto mb-4 animate-spin" />
        <p className="text-gray-700 font-semibold">{loadingMessage || 'Processing...'}</p>
        {uploadProgress > 0 && (
          <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-500 to-green-500 transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingOverlay;
