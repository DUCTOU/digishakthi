# 🛡️ Digital Shakti - Immutable Evidence Locker

> **Swadeshi for Atmanirbhar Bharat** - A blockchain-powered evidence storage system that empowers victims with tamper-proof digital proof for legal use.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Blockchain: Polygon](https://img.shields.io/badge/Blockchain-Polygon-8247E5)](https://polygon.technology/)
[![Storage: IPFS](https://img.shields.io/badge/Storage-IPFS-65C2CB)](https://ipfs.io/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Detailed Setup](#detailed-setup)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

**Digital Shakti** is a decentralized evidence locker designed to help victims secure tamper-proof digital evidence (photos, audio, location data) for legal proceedings. Built with blockchain technology and IPFS, it ensures:

- **Immutability**: Evidence cannot be altered once stored
- **Verifiability**: Anyone can verify evidence authenticity
- **Decentralization**: No single point of failure
- **Privacy**: User-controlled with wallet-based authentication

### The Problem

Traditional evidence storage is centralized, vulnerable to tampering, and often requires trusting third parties. Victims need a way to prove the authenticity and timestamp of digital evidence in legal cases.

### Our Solution

Digital Shakti uses:
1. **Client-side hashing** (SHA-256) to create a unique fingerprint of evidence
2. **IPFS storage** to store files in a decentralized manner
3. **Blockchain anchoring** to create an immutable record
4. **Smart contracts** to enable verification by anyone

## ✨ Features

### Core Functionalities

- 🔐 **Wallet Authentication**: MetaMask-based login (no passwords!)
- 📸 **Media Capture**: Upload photos, record audio, capture GPS location
- 🔗 **Blockchain Anchoring**: Evidence stored on Polygon Amoy Testnet
- ☁️ **Decentralized Storage**: Files hosted on IPFS via Pinata
- ✅ **Verification System**: Compare file hashes against blockchain records
- 📊 **Evidence Dashboard**: View all your stored evidence
- 🔍 **Transaction Tracking**: Full transparency with block explorer links

### Security Features

- **Zero-Trust Architecture**: Hashing happens client-side
- **MetaMask Signed Transactions**: All blockchain actions are cryptographically signed
- **Immutable Records**: Once stored, evidence cannot be modified
- **Decentralized Storage**: No single point of failure with IPFS
- **Cryptographic Verification**: SHA-256 hashing ensures integrity

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Crypto**: crypto-js, Web Crypto API

### Blockchain
- **Network**: Polygon Amoy Testnet
- **Smart Contract**: Solidity 0.8.0+
- **Web3 Library**: ethers.js v5.7.2
- **Wallet**: MetaMask

### Storage
- **Protocol**: IPFS (InterPlanetary File System)
- **Provider**: Pinata Cloud
- **Client**: @pinata/sdk, axios

### Development
- **Package Manager**: npm
- **Build Tool**: Next.js built-in
- **Linting**: ESLint

## 🚀 Quick Start

### Prerequisites

- Node.js v18 or higher
- MetaMask browser extension
- Test MATIC tokens (free from faucet)

### Installation

```bash
# 1. Create Next.js project
npx create-next-app@latest digital-shakti
cd digital-shakti

# 2. Install dependencies
npm install ethers@5.7.2 crypto-js @pinata/sdk axios lucide-react

# 3. Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret_key
NEXT_PUBLIC_RPC_URL=https://rpc-amoy.polygon.technology
NEXT_PUBLIC_CHAIN_ID=80002
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
EOF

# 4. Copy all downloaded files to appropriate directories
# - DigitalShakti.jsx → components/
# - blockchain.js, ipfs.js, crypto.js → utils/
# - EvidenceLocker.sol → contracts/
# - page.js, layout.js, globals.css → app/
# - next.config.js, package.json, etc. → root/

# 5. Start development server
npm run dev
```

Visit `http://localhost:3000` 🎉

## 📚 Detailed Setup

Follow these guides in order:

### 1. Basic Setup (5 minutes)
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Complete installation instructions

### 2. IPFS Configuration (10 minutes)
- [PINATA_SETUP.md](./PINATA_SETUP.md) - Get IPFS storage working

### 3. Smart Contract Deployment (15 minutes)
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deploy to Polygon Amoy

### 4. Troubleshooting
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Fix common issues

## 📁 Project Structure

```
digital-shakti/
├── app/
│   ├── page.js              # Main page
│   ├── layout.js            # Root layout
│   └── globals.css          # Global styles
│
├── components/
│   └── DigitalShakti.jsx    # Main application component
│
├── utils/
│   ├── blockchain.js        # Wallet & smart contract functions
│   ├── ipfs.js              # IPFS upload functions
│   └── crypto.js            # Hashing & encryption
│
├── contracts/
│   └── EvidenceLocker.sol   # Solidity smart contract
│
├── public/
│   └── favicon.ico          # App icon
│
├── .env.local               # Environment variables (create this!)
├── .gitignore               # Git ignore rules
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies
├── postcss.config.js        # PostCSS config
├── tailwind.config.js       # Tailwind config
│
└── docs/
    ├── SETUP_GUIDE.md       # Setup instructions
    ├── DEPLOYMENT_GUIDE.md  # Contract deployment
    ├── PINATA_SETUP.md      # IPFS setup
    └── TROUBLESHOOTING.md   # Common issues
```

## 📖 Usage Guide

### For End Users

#### 1. Connect Wallet
```
1. Click "Connect Wallet" button
2. Approve MetaMask connection
3. Switch to Polygon Amoy if prompted
```

#### 2. Upload Evidence
```
1. Click "Upload File" or use capture buttons
2. Select your file (image, audio, video)
3. Wait for:
   - Local hash generation
   - IPFS upload
   - Blockchain transaction
4. Evidence appears in your vault
```

#### 3. Verify Evidence
```
1. Click "Verify on Blockchain" for any evidence
2. System compares local hash with blockchain hash
3. Verification result shows instantly
```

### For Developers

#### Interact with Smart Contract

```javascript
import { getContract, storeEvidenceOnChain } from './utils/blockchain';

// Store evidence
const result = await storeEvidenceOnChain(
  'QmXxXxXx...', // IPFS hash
  'SHA256:abc123...', // File hash
  '{"type":"image"}' // Metadata
);

console.log('Evidence ID:', result.evidenceId);
```

#### Upload to IPFS

```javascript
import { uploadToIPFS } from './utils/ipfs';

const file = event.target.files[0];
const result = await uploadToIPFS(file, {
  name: file.name,
  type: 'evidence'
});

console.log('IPFS URL:', result.url);
```

#### Hash Files

```javascript
import { hashFile } from './utils/crypto';

const file = event.target.files[0];
const hash = await hashFile(file);
console.log('SHA-256:', hash);
```

## 🔒 Security

### Best Practices Implemented

1. **Client-Side Hashing**: Files are hashed locally before upload
2. **Private Keys Never Shared**: MetaMask handles all signing
3. **HTTPS Only**: Secure connections for all API calls
4. **Environment Variables**: Sensitive keys stored in .env.local
5. **Input Validation**: All inputs validated before processing

### Security Audits

⚠️ **Important**: This is a testnet implementation for educational purposes. Before production use:

- Conduct professional security audit
- Perform penetration testing
- Review smart contract code
- Test with small amounts first

### Known Limitations

- Testnet only (not production-ready)
- Free Pinata tier has limits (1GB storage)
- Gas fees required for blockchain transactions
- Files are public on IPFS (don't upload sensitive data)

## 🤝 Contributing

We welcome contributions! Here's how:

```bash
# 1. Fork the repository
# 2. Create feature branch
git checkout -b feature/AmazingFeature

# 3. Make changes and test
npm run dev

# 4. Commit changes
git commit -m 'Add some AmazingFeature'

# 5. Push to branch
git push origin feature/AmazingFeature

# 6. Open Pull Request
```

### Development Guidelines

- Follow existing code style
- Add comments for complex logic
- Test all features before submitting
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Anthropic** - For Claude AI assistance
- **Polygon** - For scalable blockchain infrastructure
- **IPFS/Pinata** - For decentralized storage
- **MetaMask** - For wallet functionality
- **Indian Government** - For Atmanirbhar Bharat initiative

## 📞 Support

- **Documentation**: See `/docs` folder
- **Issues**: GitHub Issues (if applicable)
- **Discussions**: GitHub Discussions (if applicable)

## 🗺️ Roadmap

### Phase 1 (Current) ✅
- [x] Basic evidence upload
- [x] Blockchain anchoring
- [x] IPFS storage
- [x] Verification system

### Phase 2 (Planned) 🚧
- [ ] Mobile app (React Native)
- [ ] Batch upload support
- [ ] Advanced search/filtering
- [ ] Evidence sharing with lawyers

### Phase 3 (Future) 🔮
- [ ] Mainnet deployment
- [ ] Integration with legal systems
- [ ] AI-powered evidence analysis
- [ ] Multi-chain support

## 🎓 Educational Resources

- [Blockchain Basics](https://docs.polygon.technology/)
- [IPFS Documentation](https://docs.ipfs.io/)
- [Solidity Tutorial](https://docs.soliditylang.org/)
- [Web3 Development](https://ethereum.org/en/developers/)

## 📊 Statistics

- **Network**: Polygon Amoy Testnet
- **Gas Cost**: ~0.001 MATIC per evidence
- **Upload Time**: 2-5 seconds average
- **Verification Time**: Instant
- **Storage**: Permanent (as long as pinned)

---

Made with ❤️ for **Atmanirbhar Bharat** 🇮🇳

**Digital Shakti** - Empowering victims through blockchain technology.
