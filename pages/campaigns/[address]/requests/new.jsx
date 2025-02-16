import React, {useState} from "react";
// import { useRouter } from "next/router";
import { Form, Button, Input, Message } from "semantic-ui-react";

import Layout from "../../../../components/Layout";
// import Campaign from "../../../../ethereum/campaign";
// import web3 from "../../../../ethereum/web3";

const New = () => {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isLoading, seIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);


  // const router = useRouter();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(''); // cleanup
    setIsLoading(false);
  };
  return (
    <Layout>
      <h3>Create a Request</h3>
      <Form
        onSubmit={handleOnSubmit}
        error={!!errorMessage} // it should be stated. Otherwise, errorMessage will not appear
      >
        <Form.Field>
          <label>Description</label>
          <Input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
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
