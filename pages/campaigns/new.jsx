import React, {useState} from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';

import Layout from '../../components/Layout';
// web3 components
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';


const CampaignNew = () => {
  const [minimumContribution, setMinimumContribution] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(''); // cleanup

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minimumContribution)
        .send({
          from:accounts[0],
        });
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <h3>Create Campaign</h3>
      <Form onSubmit={handleSubmit} error={!!errorMessage}>
        <Form.Field>
          <label htmlFor="">Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            min="0"
            value={minimumContribution}
            onChange={(e) => {
              setMinimumContribution(e.target.value);
              errorMessage && setErrorMessage(''); // cleanup
            }}
          />
        </Form.Field>
        <Message error header="Error" content={errorMessage}/>
        <Button primary loading={isLoading}>Create</Button>
      </Form>
    </Layout>
  )
};

export default CampaignNew;
