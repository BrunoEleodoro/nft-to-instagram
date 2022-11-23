import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import './App.css';
import Navbar from './components/Navbar';
import Mint from './pages/mint/Mint';

const { provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

function App() {
  return (
    <WagmiConfig client={client}>
      <Navbar />
      <Mint />
      <Outlet />
    </WagmiConfig>
  );
}

export default App;
