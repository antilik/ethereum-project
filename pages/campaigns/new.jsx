import React from 'react';
import { Form, Button, Input } from 'semantic-ui-react';

import Layout from '../../components/Layout';
// web3 components
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';


const CampaignNew = () => {
  const [minimumContribution, setMinimumContribution] = React.useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await factory.methods.createCampaign(minimumContribution)
      .send({
        from:accounts[0],
      })
  };

  return (
    <Layout>
      <h3>Create Campaign</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label htmlFor="">Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            min="0"
            value={minimumContribution}
            onChange={(e) => {
              setMinimumContribution(e.target.value);
            }}
          />

        </Form.Field>
        <Button primary>Create</Button>
      </Form>
    </Layout>
  )
};

export default CampaignNew;
