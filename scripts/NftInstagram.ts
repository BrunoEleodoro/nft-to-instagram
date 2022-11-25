import { ethers } from 'hardhat';

async function main() {
  const NftInstagramContract = await ethers.getContractFactory('NftInstagram');
  const NftInstagram = await NftInstagramContract.deploy(
    'NftInstagram',
    'NFTINST'
  );

  await NftInstagram.deployed();

  console.log(`${NftInstagram.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
