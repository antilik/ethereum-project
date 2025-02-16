import Link from "next/link";
import { Card, Button } from "semantic-ui-react";

import factory from "../ethereum/factory";
import Layout from "../components/Layout";

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
      style: { overflowWrap: 'break-word' },
    }
  });

  const showCreateCampaignBtn = () => {
    return (
      <Link href="/campaigns/new">
        <Button
          floated="right"
          primary
          content="Create Campaign"
          icon="plus square outline"
        />
      </Link>
    );
  };

  return (
    <Layout>
      {deployedCampaigns.length > 0 ? (
        <div>
          <h3>Open Campaign</h3>
          {showCreateCampaignBtn()}
          <Card.Group items={items} />
        </div>
      ) : (
        <>
          <h1>There is no deployed contract.</h1>
          {showCreateCampaignBtn()}
        </>
      )}
    </Layout>
  );
};

export default MainPage;
