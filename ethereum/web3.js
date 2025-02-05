import Web3 from "web3";

let web3;
const isClientSide = typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';

if (isClientSide) {
  window.ethereum.request({ method: 'eth_requestAccounts' });
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_URL_ADDRESS);
  web3 = new Web3(provider);
}

export default web3;
