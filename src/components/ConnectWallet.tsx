import * as React from 'react';
import { useAccount, useEnsName, useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export default function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  if (isConnected && address)
    return (
      <div>
        {ensName ??
          `${address.slice(0, 6)}...${address.slice(
            address.length - 4,
            address.length
          )}`}
      </div>
    );
  return (
    <a className="btn" onClick={() => connect()}>
      Connect Wallet
    </a>
  );
  //   return <button onClick={() => connect()}>Connect Wallet</button>;
}
