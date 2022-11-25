// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import '@openzeppelin/contracts/security/Pausable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol';
import '@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol';
import '@openzeppelin/contracts/utils/structs/EnumerableSet.sol';
import '@openzeppelin/contracts/utils/cryptography/ECDSA.sol';

import './NftInstagram.sol';

contract NftMinter is Pausable, Ownable, EIP712 {
    using SafeERC20 for IERC20;
    using EnumerableSet for EnumerableSet.AddressSet;

    NftInstagram public immutable nftContract;
    string public minterName;
    string public minterVersion;

    constructor(NftInstagram _nftContract, string memory _minterVersion)
        EIP712(string.concat(_nftContract.name(), ' Minter'), _minterVersion)
    {
        nftContract = _nftContract;
        minterName = string.concat(_nftContract.name(), ' Minter');
        minterVersion = _minterVersion;
    }

    function mint(string memory uri) external payable whenNotPaused {
        // mint the thing
        nftContract.safeMint(msg.sender, uri);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    /// In an emergency, withdraw any tokens stranded in this contract's balance
    function rescueStrandedTokens(
        address token,
        uint256 amount,
        address recipient
    ) external onlyOwner {
        require(recipient != address(0), "Don't send to zero address");
        IERC20(token).safeTransfer(recipient, amount);
    }

    /// Rescue any stranded native currency
    function rescueNative(uint256 amount, address recipient)
        external
        onlyOwner
    {
        require(recipient != address(0), "Don't send to zero address");
        payable(recipient).transfer(amount);
    }
}
