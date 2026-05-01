// app/layout.js
import './globals.css';

export const metadata = {
  title: 'Digital Shakti - Immutable Evidence Locker',
  description: 'Swadeshi blockchain-powered evidence storage for Atmanirbhar Bharat. Secure, tamper-proof digital evidence with IPFS and Polygon.',
  keywords: 'blockchain, evidence locker, IPFS, Polygon, cybersecurity, India, Swadeshi',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
