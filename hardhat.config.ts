import { HardhatUserConfig } from 'hardhat/config';
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
        url: 'https://mainnet.infura.io/v3/2d4479662e3b4863b3fc5dba3889db94',
      },
    },
  },
};

export default config;
