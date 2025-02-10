
// Import dependencies
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

const Web3App = () => {
    const [account, setAccount] = useState('');
    const [balance, setBalance] = useState('');
    const [contractData, setContractData] = useState('');

    useEffect(() => {
        loadWeb3();
    }, []);

    const loadWeb3 = async () => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);

            const balance = await web3.eth.getBalance(accounts[0]);
            setBalance(web3.utils.fromWei(balance, 'ether'));

            // Example Smart Contract interaction
            const contractABI = [ /* ABI of the contract */ ];
            const contractAddress = '0xYourSmartContractAddressHere';
            const contract = new web3.eth.Contract(contractABI, contractAddress);
            const result = await contract.methods.yourMethodName().call();
            setContractData(result);
        } else {
            alert('Please install MetaMask to use this feature.');
        }
    };

    return (
        <div>
            <h1>Web3 React App</h1>
            <p>Connected Account: {account}</p>
            <p>Balance: {balance} ETH</p>
            <p>Contract Data: {contractData}</p>
        </div>
    );
};

export default Web3App;
