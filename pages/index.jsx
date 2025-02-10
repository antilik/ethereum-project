import React from 'react';
import { Card, Button } from 'semantic-ui-react';

import factory from '../ethereum/factory';
import Layout from '../components/Layout';

export const getServerSideProps = (async () => {
  const deployedCampaigns = await factory.methods.getDeployedCampaigns().call();
  return { props: { deployedCampaigns } }
});

const MainPage = ({ deployedCampaigns }) => {
  const items = deployedCampaigns?.map((address) => {
    return {
      header: address,
      description: <a>View Campaign</a>,
      fluid: true,
    }
  });

  return (
    <Layout>
      {deployedCampaigns.length > 0 ? (
        <div>
          <h3>Open Campaign</h3>
          <Button
            floated="right"
            primary
            content="Create Campaign"
            icon="plus square outline"
          />
          <Card.Group items={items} />
        </div>
      ) : (
        <h1>There is no deployed contract.</h1>
      )}
    </Layout>
  );
};

export default MainPage;
