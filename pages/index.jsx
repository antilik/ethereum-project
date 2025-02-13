import React from 'react';
import { Card, Button } from 'semantic-ui-react';

import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import Link from "next/link";

export const getServerSideProps = (async () => {
  const deployedCampaigns = await factory.methods.getDeployedCampaigns().call();
  return { props: { deployedCampaigns } }
});

const MainPage = ({ deployedCampaigns }) => {
  const items = deployedCampaigns?.map((address) => {
    return {
      header: address,
      description: (
        <Link href={`/campaigns/${address}`}>
          <a>View Campaign</a>
        </Link>
      ),
      fluid: true,
    }
  });

  return (
    <Layout>
      {deployedCampaigns.length > 0 ? (
        <div>
          <h3>Open Campaign</h3>
          <Link href="/campaigns/new">
            <Button
              floated="right"
              primary
              content="Create Campaign"
              icon="plus square outline"
            />
          </Link>

          <Card.Group items={items} />
        </div>
      ) : (
        <h1>There is no deployed contract.</h1>
      )}
    </Layout>
  );
};

export default MainPage;
