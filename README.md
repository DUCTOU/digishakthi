# Digital Shakti: Decentralized Evidence Locker

**Digital Shakti** is a secure, tamper-proof evidence management system designed to empower users by providing immutable storage for critical evidence. By leveraging **Blockchain** for integrity and **IPFS** for decentralized storage, it ensures that evidence remains verifiable and accessible without a central point of failure.

## Key Features

- **Immutable Evidence Records:** Stores file hashes on-chain to ensure evidence cannot be altered after upload.
- **Decentralized File Storage:** Uses IPFS (via Pinata) to host evidence files across a distributed network.
- **Real-time Hashing:** Generates SHA-256 digital fingerprints locally before upload.
- **On-Chain Verification:** Verifies evidence by comparing local files against blockchain records.
- **Web3 Integration:** Connects and signs transactions using MetaMask on the Polygon Amoy Testnet.
- **Audio/Visual Evidence:** Integrates device cameras and microphones for immediate evidence capture.

## Tech Stack

| Component | Technology |
|---|---|
| Frontend | Next.js 14+, Tailwind CSS |
| Blockchain | Solidity, Polygon Amoy Testnet |
| Storage | IPFS via Pinata |
| Libraries | Ethers.js, Web Crypto API |
| Wallet | MetaMask |

## 🛠️ Getting Started

### Prerequisites

- Node.js installed on your machine.
- MetaMask browser extension.
- Polygon Amoy Testnet configured in MetaMask.
- Pinata account for IPFS API credentials.

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd digishakthi
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory.

Add the required environment variables:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
NEXT_PUBLIC_RPC_URL=https://rpc-amoy.polygon.technology

PINATA_API_KEY=your_api_key
PINATA_SECRET_KEY=your_secret_key
```

**Security:** Keep Pinata secret credentials server-side. Never expose secret keys using the `NEXT_PUBLIC_` prefix. Never commit `.env.local` to GitHub.

### 4. Run the Application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Security Notes

- **No Central Database:** Evidence metadata is stored on the blockchain, while files are stored on IPFS.
- **Environment Safety:** API keys and sensitive credentials are managed through environment variables and excluded from Git using `.gitignore`.
- **Local Signing:** Transactions are signed through MetaMask, keeping the user's wallet private key within the wallet.

## Contributors

This project was collaboratively developed by:

- **Senthil Velan** – [@Senthil-velan19](https://github.com/Senthil-velan19)
- **DUCTOU** – [@DUCTOU](https://github.com/DUCTOU)

Both contributors collaborated on the development of Digital Shakti, a decentralized evidence management system.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

**Developed with ❤️ for Digital Shakti**
