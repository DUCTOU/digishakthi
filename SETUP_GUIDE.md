# Digital Shakti - Complete Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **npm** or **yarn** package manager
3. **MetaMask Browser Extension** - [Install](https://metamask.io/)
4. **Git** (optional, for version control)

## 🚀 Quick Start Commands

### Step 1: Create Next.js Project

```bash
# Create a new Next.js app
npx create-next-app@latest digital-shakti

# When prompted, choose:
# ✓ TypeScript? No
# ✓ ESLint? Yes
# ✓ Tailwind CSS? Yes
# ✓ src/ directory? No
# ✓ App Router? Yes
# ✓ Import alias? No

# Navigate to project
cd digital-shakti
```

### Step 2: Install Required Dependencies

```bash
# Install blockchain and crypto libraries
npm install ethers@5.7.2 crypto-js

# Install IPFS client (Pinata)
npm install @pinata/sdk axios

# Install additional UI libraries
npm install lucide-react

# Install development dependencies
npm install --save-dev @types/node
```

### Step 3: Setup Project Structure

```bash
# Create necessary directories
mkdir -p components utils contracts lib config
```

### Step 4: Add Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Create .env.local file
touch .env.local
```

Add the following content to `.env.local`:

```env
# Pinata IPFS Credentials (Get from https://pinata.cloud/)
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret_key

# Polygon Amoy Testnet RPC
NEXT_PUBLIC_RPC_URL=https://rpc-amoy.polygon.technology

# Smart Contract Address (deploy first, then add here)
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address

# Chain ID for Polygon Amoy Testnet
NEXT_PUBLIC_CHAIN_ID=80002
```

### Step 5: Run the Application

```bash
# Start development server
npm run dev

# Application will be available at:
# http://localhost:3000
```

## 📦 File Structure

After setup, your project should look like this:

```
digital-shakti/
├── app/
│   ├── page.js                 # Main application page
│   ├── layout.js               # Root layout
│   └── globals.css             # Global styles
├── components/
│   └── DigitalShakti.jsx       # Main component (your downloaded file)
├── utils/
│   ├── blockchain.js           # Blockchain interaction utilities
│   ├── ipfs.js                 # IPFS upload utilities
│   └── crypto.js               # Hashing utilities
├── contracts/
│   └── EvidenceLocker.sol      # Smart contract
├── lib/
│   └── constants.js            # App constants
├── .env.local                  # Environment variables
├── package.json                # Dependencies
└── next.config.js              # Next.js configuration
```

## 🔧 Additional Commands

### Build for Production
```bash
npm run build
npm start
```

### Lint Code
```bash
npm run lint
```

### Clear Cache (if issues occur)
```bash
rm -rf .next node_modules
npm install
npm run dev
```

## 🌐 MetaMask Setup

### 1. Install MetaMask
- Install MetaMask extension from [metamask.io](https://metamask.io/)
- Create a new wallet or import existing one
- **IMPORTANT**: Save your seed phrase securely!

### 2. Add Polygon Amoy Testnet

In MetaMask:
1. Click on network dropdown (top center)
2. Click "Add Network"
3. Click "Add a network manually"
4. Enter the following details:

```
Network Name: Polygon Amoy Testnet
New RPC URL: https://rpc-amoy.polygon.technology
Chain ID: 80002
Currency Symbol: MATIC
Block Explorer URL: https://amoy.polygonscan.com/
```

### 3. Get Test MATIC

You need test MATIC for transactions:

1. Copy your wallet address from MetaMask
2. Visit Polygon Amoy Faucet: https://faucet.polygon.technology/
3. Select "Polygon Amoy"
4. Paste your address and request tokens
5. Wait 1-2 minutes for tokens to arrive

## 📝 Important Notes

### Security Best Practices

1. **Never commit `.env.local`** - Add it to `.gitignore`
2. **Use testnet only** for development
3. **Keep private keys secure** - Never share or commit them
4. **Validate all inputs** before blockchain transactions

### Common Issues & Solutions

**Issue**: MetaMask not detected
```javascript
// Solution: Check if window.ethereum exists
if (typeof window.ethereum === 'undefined') {
  alert('Please install MetaMask!');
}
```

**Issue**: Wrong network selected
```javascript
// Solution: Add network switching logic
const switchNetwork = async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x13882' }], // 80002 in hex
    });
  } catch (error) {
    console.error('Network switch failed:', error);
  }
};
```

**Issue**: Transaction fails
- Check you have enough test MATIC
- Verify contract address is correct
- Check network is Polygon Amoy

## 🎯 Next Steps

After basic setup:

1. ✅ Setup Pinata account for IPFS
2. ✅ Deploy smart contract to Polygon Amoy
3. ✅ Update environment variables
4. ✅ Test wallet connection
5. ✅ Test file upload to IPFS
6. ✅ Test blockchain anchoring
7. ✅ Test verification feature

## 🆘 Getting Help

- **Polygon Documentation**: https://docs.polygon.technology/
- **Ethers.js Docs**: https://docs.ethers.org/v5/
- **Pinata Docs**: https://docs.pinata.cloud/
- **Next.js Docs**: https://nextjs.org/docs

---

**Ready to build? Start with Step 1!** 🚀
