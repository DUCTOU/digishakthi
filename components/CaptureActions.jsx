import React from 'react';
import { Upload, Mic, Camera, MapPin } from 'lucide-react';

const CaptureActions = ({
  fileInputRef,
  cameraInputRef,
  onFileChange,
  onCameraCapture,
  isLoading,
  recording,
  toggleRecording,
  location,
  captureLocation,
  evidence
}) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 bg-gradient-to-br from-orange-50 to-green-50 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
            Capture Evidence
          </h2>
          <p className="text-sm text-gray-600">Secure your digital proof</p>
        </div>

        <div className="p-6 space-y-4">
          {/* File Upload */}
          <div>
            <input type="file" ref={fileInputRef} onChange={onFileChange} className="hidden" accept="image/*,audio/*,video/*,application/pdf" />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-300 hover:border-orange-400 rounded-xl transition-all duration-300 disabled:opacity-50"
            >
              <Upload className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Upload File</span>
            </button>
          </div>

          {/* Audio Recording */}
          <button
            onClick={toggleRecording}
            disabled={isLoading && !recording}
            className={`w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl transition-all duration-300 ${
              recording 
                ? 'bg-red-600 text-white shadow-lg' 
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
            } disabled:opacity-50`}
          >
            <Mic className={`w-5 h-5 ${recording ? 'animate-pulse' : ''}`} />
            <span className="font-semibold">
              {recording ? 'Stop Recording' : 'Record Audio'}
            </span>
          </button>

          {/* Camera Capture */}
          <div>
            <input type="file" ref={cameraInputRef} onChange={onCameraCapture} className="hidden" accept="image/*" capture="environment" />
            <button
              onClick={() => cameraInputRef.current?.click()}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-xl transition-all duration-300 disabled:opacity-50"
            >
              <Camera className="w-5 h-5" />
              <span className="font-semibold">Capture Photo</span>
            </button>
          </div>

          {/* Get Location */}
          <button
            onClick={captureLocation}
            className={`w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl transition-all duration-300 ${
              location
                ? 'bg-green-50 text-green-700 border border-green-300'
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
            }`}
          >
            <MapPin className={`w-5 h-5 ${location ? 'fill-current' : ''}`} />
            <span className="font-semibold">
              {location ? 'Location Captured' : 'Capture Location'}
            </span>
          </button>

          {location && (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-gray-600 mb-1">Coordinates:</p>
              <p className="text-sm font-mono text-gray-800">
                {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-orange-600">{evidence.length}</div>
          <div className="text-xs text-gray-600 mt-1">Total Evidence</div>
        </div>
        <div className="p-4 bg-white rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            {evidence.filter(e => e.status === 'anchored').length}
          </div>
          <div className="text-xs text-gray-600 mt-1">On-Chain</div>
        </div>
      </div>
    </div>
  );
};

export default CaptureActions;
