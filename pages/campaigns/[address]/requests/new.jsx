import React, {useState} from "react";
import { useRouter } from "next/router";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Link from "next/link";

import Layout from "../../../../components/Layout";
import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";

const New = () => {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const router = useRouter();
  const getAddressLink = () => {
    const address = router.query.address;
    return `/campaigns/${address}`;
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    errorMessage && setErrorMessage(''); // cleanup
    const address = router.query.address;
    const campaign = Campaign(address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.createRequest(
        description,
        web3.utils.toWei(value, 'ether'),
        recipient,
      ).send({ from: accounts[0] });
      router.push(getAddressLink());
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      <Link
        href={getAddressLink()}
      >
        Back
      </Link>
      <h3>Create a Request</h3>
      <Form
        onSubmit={handleOnSubmit}
        error={!!errorMessage} // it should be stated. Otherwise, errorMessage will not appear
      >
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(e) => {
              setRecipient(e.target.value);
            }}
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

export default New;
