const { Web3 } = require('web3');
const assert = require('assert');

const ganache = require('ganache');

const web3 = new Web3(ganache.provider());

const compileFactory = require('../ethereum/build/CampaignFactory.json');
const compileCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let managerAccount;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  managerAccount = accounts[0];

  factory = await new web3.eth.Contract(JSON.parse(compileFactory.interface))
    .deploy({ data: compileFactory.bytecode })
    .send({ from: managerAccount, gas: '1000000'});

  await factory.methods.createCampaign('100')
    .send({
      from: managerAccount,
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

  it('Should mark caller as campaign manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(managerAccount, manager);
  });

  it('Should allow people to contribute $ and marks them as approvers', async () => {
    const contributor = accounts[1];
    await campaign.methods.contribute().send({
      value: '200',
      from: contributor,
    });

    const isContributor = await campaign.methods.approvers(contributor).call();
    assert(isContributor);
  });

  it('should be contribution sum more than minimum', async () => {
    const contributor = accounts[1];
    try {
      await campaign.methods.contribute().send({
        value: '88',
        from: contributor,
      })
      assert(false);
    } catch(e) {
      assert(e);
    }
  });

  it('should manager have ability to create a request', async () => {
    const value = '100'
    const description = 'Buy solar panels';
    const recipient = accounts[1];

    await campaign.methods.createRequest(description, value, recipient).send({
      from: managerAccount,
      gas: '1000000',
    })
    const request = await campaign.methods.requests(0).call();
    assert.equal(request.value, value);
    assert.equal(request.description, description);
    assert.equal(request.recipient, recipient);
  });

  it('should process requests from manager', async () => {
    const recipient = accounts[1];
    const getBalanceOfRecipient = async () => {
      let balance = await web3.eth.getBalance(recipient);
      balance = web3.utils.fromWei(balance, 'ether');
      balance = parseFloat(balance);

      return balance;
    };
    const initialBalance = await getBalanceOfRecipient();

    await campaign.methods.contribute().send({
      from: managerAccount,
      value: web3.utils.toWei('6', 'ether'),
    });

    await campaign.methods.createRequest('Buy tables', web3.utils.toWei('3', 'ether'), recipient)
      .send({
      from: managerAccount,
        gas: '1000000',
    });

    await campaign.methods.approveRequest(0)
      .send({
        from: managerAccount,
        gas: '1000000',
      });

    await campaign.methods.finalizeRequest(0).send({
      from: managerAccount,
      gas: '1000000',
    });

    const totalBalance = await getBalanceOfRecipient();

    assert(totalBalance > initialBalance);
  });
});
