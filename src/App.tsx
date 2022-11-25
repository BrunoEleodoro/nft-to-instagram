import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import './App.css';
import Navbar from './components/Navbar';
import MintCtxProvider from './contexts/MintContext';
import Mint from './pages/mint/Mint';

const { provider, webSocketProvider } = configureChains(
  [chain.polygon],
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
      <MintCtxProvider>
        <Navbar />
        <Mint />
        <Outlet />
      </MintCtxProvider>
    </WagmiConfig>
  );
}

export default App;
