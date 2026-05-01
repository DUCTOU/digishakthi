'use client';
import { useState, useRef, useCallback } from 'react';
import { connectWallet as connectWalletLib, isMetaMaskInstalled, getMyEvidences, storeEvidenceOnChain, getEvidenceFromChain, verifyEvidenceOnChain } from '../lib/blockchain';
import { hashFile } from '../lib/crypto';
import { uploadToIPFS } from '../lib/ipfs';

export default function useEvidenceLocker() {
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [evidence, setEvidence] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [verificationResult, setVerificationResult] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [location, setLocation] = useState(null);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const showNotification = useCallback((message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 4000);
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      if (!isMetaMaskInstalled()) {
        showNotification('MetaMask is not installed. Please install the MetaMask browser extension.', 'error');
        return;
      }
      setIsLoading(true);
      setLoadingMessage('Connecting wallet...');
      const result = await connectWalletLib();
      setWalletAddress(result.address);
      setIsConnected(true);
      showNotification('Wallet connected successfully', 'success');

      // Load existing evidence
      try {
        setLoadingMessage('Loading your evidence...');
        const myEvidences = await getMyEvidences();
        const formatted = myEvidences.map(e => ({
          id: e.id,
          name: e.metadata ? tryParseMetadataName(e.metadata) : `Evidence #${e.id}`,
          hash: e.fileHash,
          ipfsCID: e.ipfsHash,
          timestamp: new Date(e.timestamp * 1000).toISOString(),
          status: 'anchored',
          onChain: true,
          location: e.metadata ? tryParseMetadataLocation(e.metadata) : null,
        }));
        setEvidence(formatted);
      } catch (err) {
        console.log('No existing evidence or contract not deployed yet:', err.message);
      }
    } catch (error) {
      const msg = error.message || 'Failed to connect wallet';
      if (msg.includes('User rejected')) {
        showNotification('Connection rejected by user', 'error');
      } else {
        showNotification(msg, 'error');
      }
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [showNotification]);

  const captureLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            timestamp: new Date().toISOString()
          });
          showNotification('Location captured successfully', 'success');
        },
        () => showNotification('Unable to capture location', 'error')
      );
    }
  }, [showNotification]);

  const handleFileUpload = useCallback(async (file) => {
    if (!file) return;
    try {
      setIsLoading(true);

      // Step 1: Hash the file
      setLoadingMessage('Hashing file (SHA-256)...');
      setUploadProgress(15);
      const fileHash = await hashFile(file);

      // Step 2: Upload to IPFS
      setLoadingMessage('Uploading to IPFS...');
      setUploadProgress(40);
      const metadata = { name: file.name, owner: walletAddress, type: 'evidence' };
      const ipfsResult = await uploadToIPFS(file, metadata);
      setUploadProgress(70);

      // Step 3: Store on blockchain
      setLoadingMessage('Storing on blockchain (confirm in MetaMask)...');
      const metadataJson = JSON.stringify({
        name: file.name,
        size: file.size,
        type: file.type,
        location: location,
        uploadedAt: new Date().toISOString()
      });
      const chainResult = await storeEvidenceOnChain(ipfsResult.ipfsHash, fileHash, metadataJson);
      setUploadProgress(100);

      const newEvidence = {
        id: chainResult.evidenceId,
        name: file.name,
        hash: fileHash,
        ipfsCID: ipfsResult.ipfsHash,
        timestamp: new Date().toISOString(),
        status: 'anchored',
        onChain: true,
        location: location,
        txHash: chainResult.transactionHash,
      };
      setEvidence(prev => [newEvidence, ...prev]);
      showNotification(`Evidence #${chainResult.evidenceId} secured on blockchain!`, 'success');
    } catch (error) {
      console.error('Upload error:', error);
      const msg = error.message || 'Failed to upload evidence';
      if (msg.includes('INSUFFICIENT_FUNDS') || msg.includes('insufficient funds')) {
        showNotification('Insufficient MATIC for gas fees', 'error');
      } else if (msg.includes('user rejected') || msg.includes('User denied')) {
        showNotification('Transaction rejected by user', 'error');
      } else if (msg.includes('Pinata') || msg.includes('pinata')) {
        showNotification('IPFS upload failed — check Pinata API keys', 'error');
      } else if (msg.includes('Contract address not configured')) {
        showNotification('Contract not deployed yet — deploy first', 'error');
      } else {
        showNotification(msg.substring(0, 100), 'error');
      }
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
      setUploadProgress(0);
    }
  }, [walletAddress, location, showNotification]);

  const toggleRecording = useCallback(async () => {
    if (recording) {
      // Stop recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      setRecording(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(track => track.stop());
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioFile = new File([audioBlob], `audio_${Date.now()}.webm`, { type: 'audio/webm' });
        await handleFileUpload(audioFile);
      };

      mediaRecorder.start();
      setRecording(true);
      showNotification('Recording started — click again to stop', 'success');
    } catch (err) {
      showNotification('Microphone access denied', 'error');
    }
  }, [recording, handleFileUpload, showNotification]);

  const verifyEvidence = useCallback(async (evidenceItem) => {
    if (!evidenceItem.onChain || !evidenceItem.id) {
      showNotification('This evidence is not on-chain yet', 'error');
      return;
    }
    try {
      setIsLoading(true);
      setLoadingMessage('Verifying on blockchain...');
      const chainData = await getEvidenceFromChain(evidenceItem.id);
      const hashesMatch = chainData.fileHash === evidenceItem.hash;
      setVerificationResult({
        verified: hashesMatch,
        hash: evidenceItem.hash,
        blockchainHash: chainData.fileHash,
        match: hashesMatch,
        owner: chainData.owner,
        timestamp: new Date(chainData.timestamp * 1000).toLocaleString(),
      });
    } catch (error) {
      showNotification('Verification failed: ' + (error.message || 'Unknown error'), 'error');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [showNotification]);

  return {
    walletAddress, isConnected, evidence, isLoading, loadingMessage,
    notification, verificationResult, uploadProgress, location, recording,
    connectWallet, captureLocation, handleFileUpload, toggleRecording,
    verifyEvidence, setVerificationResult, showNotification,
  };
}

function tryParseMetadataName(metadata) {
  try { return JSON.parse(metadata).name || 'Evidence'; } catch { return 'Evidence'; }
}
function tryParseMetadataLocation(metadata) {
  try { return JSON.parse(metadata).location || null; } catch { return null; }
}
