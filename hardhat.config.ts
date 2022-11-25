import { task, HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-address-exporter';
import 'hardhat-deploy';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: '0.8.17',
// };
task(
  'list-deployments',
  'List all the deployed contracts for a network',
  async (args, hre) => {
    console.log(`All deployments on ${hre.network.name}:`);
    for (const [name, deployment] of Object.entries(
      await hre.deployments.all()
    )) {
      console.log(`${name}: ${deployment.address}`);
    }
  }
);
const privKey = process.env.SIGNER_KEY || '0x000';

const config: HardhatUserConfig = {
  solidity: '0.8.12',
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  addressExporter: {
    outDir: path.resolve('./src/shared/addresses'),
  },
  typechain: {
    outDir: 'src/shared/types',
    target: 'ethers-v5',
  },
  paths: {
    artifacts: './src/shared/abi',
  },
  networks: {
    hardhat: {
      accounts: [
        {
          privateKey: process.env.SIGNER_KEY!,
          balance: '10000000000000000000000000000000000000',
        },
      ],
      forking: {
        url: 'https://polygon-mainnet.infura.io/v3/295cce92179b4be498665b1b16dfee34',
      },
    },
    polygon: {
      accounts: [privKey],
      url: 'https://polygon-mainnet.infura.io/v3/295cce92179b4be498665b1b16dfee34',
      forking: {
        url: 'https://polygon-mainnet.infura.io/v3/295cce92179b4be498665b1b16dfee34',
      },
      chainId: 137,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY,
  },
};

export default config;
