'use client';
import React, { useRef } from 'react';
import useEvidenceLocker from './useEvidenceLocker';
import Header from './Header';
import LoadingOverlay from './LoadingOverlay';
import Notification from './Notification';
import Landing from './Landing';
import CaptureActions from './CaptureActions';
import EvidenceList from './EvidenceList';
import VerificationModal from './VerificationModal';
import Footer from './Footer';

const DigitalShakti = () => {
  const {
    walletAddress, isConnected, evidence, isLoading, loadingMessage,
    notification, verificationResult, uploadProgress, location, recording,
    connectWallet, captureLocation, handleFileUpload, toggleRecording,
    verifyEvidence, setVerificationResult,
  } = useEvidenceLocker();
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFileUpload(file);
    e.target.value = '';
  };

  const onCameraCapture = (e) => {
    const file = e.target.files[0];
    if (file) handleFileUpload(file);
    e.target.value = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 font-sans">
      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>
      </div>

      <LoadingOverlay 
        isLoading={isLoading} 
        loadingMessage={loadingMessage} 
        uploadProgress={uploadProgress} 
      />

      <Header 
        isConnected={isConnected} 
        walletAddress={walletAddress} 
        connectWallet={connectWallet} 
        isLoading={isLoading} 
      />

      <Notification notification={notification} />

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {!isConnected ? (
          <Landing />
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <CaptureActions
              fileInputRef={fileInputRef}
              cameraInputRef={cameraInputRef}
              onFileChange={onFileChange}
              onCameraCapture={onCameraCapture}
              isLoading={isLoading}
              recording={recording}
              toggleRecording={toggleRecording}
              location={location}
              captureLocation={captureLocation}
              evidence={evidence}
            />
            <EvidenceList 
              evidence={evidence} 
              isLoading={isLoading} 
              verifyEvidence={verifyEvidence} 
            />
          </div>
        )}

        <VerificationModal 
          verificationResult={verificationResult} 
          setVerificationResult={setVerificationResult} 
        />
      </main>

      <Footer />

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DigitalShakti;
