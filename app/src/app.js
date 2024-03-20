import Web3 from 'web3';
const contractAddress = "0x2C1d1E8aFA70f329fAB61ab11083bbec42f90bC3";
const abi = [
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "hash",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      }
    ],
    "name": "uploadImage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "hash",
        "type": "bytes32"
      }
    ],
    "name": "getImage",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]; // Your contract ABI

const web3 = new Web3(window.ethereum);

const contract = new web3.eth.Contract(abi, contractAddress);

async function uploadImage() {
    const file = document.getElementById('imageInput').files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
        const ipfsHash = await addToIPFS(reader.result);
        const accounts = await web3.eth.requestAccounts();
        const hash = web3.utils.keccak256(ipfsHash);

        await contract.methods.uploadImage(hash, ipfsHash).send({ from: accounts[0] });
    };

    reader.readAsArrayBuffer(file);
}

async function retrieveImage() {
    const hash = document.getElementById('hashInput').value;
    const ipfsHash = await contract.methods.getImage(hash).call();

    const imageUrl = `https://ipfs.io/ipfs/${ipfsHash}`;
    document.getElementById('imageDisplay').innerHTML = `<img src="${imageUrl}" alt="Uploaded Image">`;
}

//5001
async function addToIPFS(data) {
    const res = await fetch('http://localhost:5001/api/v0/add', {
        method: 'POST',
        body: data,
    });
    const json = await res.json();
    return json.Hash;
}



// // if (typeof web3 !== 'undefined') {
// //     web3 = new Web3(web3.currentProvider);
// // } else {
// //     // set the provider you want from Web3.providers
// // web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
// // }

// var web3;

// var agentContractAddress = '0x9406d9AF2AcF857fd3809705ABe4Efcd518aF4F3';

// function connect(){
//     web3 = new Web3(window.ethereum)
//     window.ethereum.enable().catch(error => {
//         // User denied account access
//         console.log(error);
//     })
//     AgentContract = web3.eth.contract(abi);
//     contractInstance = AgentContract.at(agentContractAddress);   
//     web3.eth.defaultAccount = web3.currentProvider.selectedAddress;
//     console.log("Web3 Connected:"+ web3.eth.defaultAccount );
//     return web3.currentProvider.selectedAddress;
// }
    
// window.addEventListener('load', async () => {
//     // New web3 provider
//     connect();
//     console.log("Externally Loaded!");
// });