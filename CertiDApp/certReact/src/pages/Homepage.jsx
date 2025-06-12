import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserProvider } from 'ethers';
import Navbar from '../components/Navbar';

const Homepage = () => {
  const [certificateId, setCertificateId] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const navigate = useNavigate();

  async function connectToMetamask() {
    if (!window.ethereum) {
      alert('MetaMask is not installed!');
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress();
      console.log("Connected signer address:", signerAddress);

      setWalletAddress(signerAddress);
      setWalletConnected(true);
    } catch (err) {
      console.error("Failed to connect to MetaMask:", err);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (certificateId) {
      navigate(`/view-certificate/${certificateId}`);
    }
  };

  return (
    <div>
      <div className="bg-slate-300 min-h-screen pt-8">
        <Navbar/>
        <h1 className="text-center text-4xl font-semibold text-gray-800 mb-8">
          Certificate Dapp
        </h1>

        <div className="flex justify-center items-center mb-8">
          <img 
            src="/images/online-course.png" 
            alt="Online course certification" 
            className="h-32 w-32"
          />
        </div>

        <div className="flex flex-col items-center mb-6">
          <button
            onClick={connectToMetamask}
            disabled={walletConnected}
            className={`px-6 py-2 text-white rounded-md transition ${
              walletConnected ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {walletConnected ? 'Connected to MetaMask' : 'Connect to MetaMask'}
          </button>
          {walletConnected && (
            <p className="mt-2 text-sm text-gray-700">
              Connected Address: <span className="font-mono">{walletAddress}</span>
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex justify-center">
          <div className="flex gap-2">
            <input
              className="placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-slate-300 shadow-sm"
              type="number"
              id="courseId"
              placeholder="Enter Certificate ID"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              aria-label="Certificate ID"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Homepage;


