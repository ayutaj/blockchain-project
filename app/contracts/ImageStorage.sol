// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.5.1;

contract ImageStorage {
    mapping(bytes32 => string) private images;

    function uploadImage(bytes32 hash, string memory ipfsHash) public {
        images[hash] = ipfsHash;
    }

    function getImage(bytes32 hash) public view returns (string memory) {
        return images[hash];
    }
}
