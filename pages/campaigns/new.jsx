import React, { useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";

import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";


const CampaignNew = () => {
  const [minimumContribution, setMinimumContribution] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleOnChange = (e) => {
    setMinimumContribution(e.target.value);
    errorMessage && setErrorMessage(''); // cleanup
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(''); // cleanup

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minimumContribution)
        .send({
          from:accounts[0],
        });
      router.push('/');
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <h3>Create Campaign</h3>
      <Form
        onSubmit={handleOnSubmit}
        error={!!errorMessage} // it should be stated. Otherwise, errorMessage will not appear
      >
        <Form.Field>
          <label htmlFor="">Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            min="0"
            value={minimumContribution}
            onChange={handleOnChange}
          />
        </Form.Field>
        <Message
          error
          header="Error"
          content={errorMessage}
        />
        <Button
          primary
          loading={isLoading}
        >Create</Button>
      </Form>
    </Layout>
  )
};

export default CampaignNew;
