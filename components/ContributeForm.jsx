import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import { useRouter } from "next/router";

import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";

const ContributeForm = ({ address }) => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const handleOnChange = (e) => {
    setValue(e.target.value);
    errorMessage && setErrorMessage(''); // cleanup
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const campaign = Campaign(address);
    setErrorMessage('');

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether')
      });
      setValue('');
      await router.replace(router.asPath);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      onSubmit={handleOnSubmit}
      error={!!errorMessage} // it should be stated. Otherwise, errorMessage will not appear
    >
      <Form.Field>
        <label>Amount to contribute</label>
        <Input
          label="ether"
          labelPosition="right"
          value={value}
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
      >
        Contribute
      </Button>
    </Form>
  )
};

export default ContributeForm;
