const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');

const compiledFactory  = require('./build/CampaignFactory.json');

// dotenv should be here for env variables
const dotenv = require('dotenv').config();

const provider = new HDWalletProvider(
  process.env.MNEMONIC_PHRASE,
  process.env.URL_ADDRESS
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  console.log('Attempting to deploy from account', account);
  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: account });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
