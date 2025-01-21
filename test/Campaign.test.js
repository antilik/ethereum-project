const { Web3 } = require('web3');
const assert = require('assert');

const ganache = require('ganache');

const web3 = new Web3(ganache.provider());

const compileFactory = require('../ethereum/build/CampaignFactory.json');
const compileCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compileFactory.interface))
    .deploy({ data: compileFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000'});

  await factory.methods.createCampaign('100')
    .send({
      from: accounts[0],
      gas: '1000000',
    });

  [campaignAddress] = await factory.methods.getDeployedCampaigns()
    .call();

  campaign = await new web3.eth.Contract(
    JSON.parse(compileCampaign.interface),
    campaignAddress,
  );
})

describe('Campaign', () => {
  it('Should deploy a factory and a campaign', async () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });
});
