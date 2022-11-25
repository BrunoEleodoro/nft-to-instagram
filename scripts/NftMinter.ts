import { ethers } from 'hardhat';

async function main() {
  const NftMinterContract = await ethers.getContractFactory('NftMinter');
  const NftMinter = await NftMinterContract.deploy(
    '0x955c3758d5c7033a61460a516ebfa899a48101e5',
    '0.1'
  );

  await NftMinter.deployed();

  console.log(`NftMinter: ${NftMinter.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
