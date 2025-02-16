import { Button, Card, Grid } from "semantic-ui-react";
import Link from "next/link";

import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import ContributeForm from "../../../components/ContributeForm";

import web3 from "../../../ethereum/web3";

export const getServerSideProps = (async (context) => {
  const address = context.params.address;
  const campaign =  Campaign(address);
  const summary =  await campaign.methods.getSummary().call();

  return {
    props: {
      minimumContribution: summary[0]?.toString(),
      balance: summary[1]?.toString(),
      requestsCount: summary[2]?.toString(),
      approversCount: summary[3]?.toString(),
      manager: summary[4],
      address: address,
    },
  };
});

const CampaignShow = ({ minimumContribution, balance, requestsCount, approversCount, manager, address }) => {
  const items = [
    {
      header: manager,
      meta: 'Address of Manager',
      description: 'The Manager created the campaign and can manage it',
      style: { overflowWrap: 'break-word' },
    },
    {
      header: minimumContribution,
      meta: 'Minimum Contribution (wei)',
      description: 'The minimum amount for contribution',
    },
    {
      header: web3.utils.fromWei(balance, 'ether'),
      meta: 'The balance of campaign (\'ether\')',
      description: 'The balance is how much money this campaign has left to spend',
    },
    {
      header: requestsCount,
      meta: 'Number of requests for campaign',
      description: 'A request tries to withdraw money from the campaign',
    },
    {
      header: approversCount,
      meta: 'Number of approvals for the campaign',
      description: 'Number of people who already donated to the campaign',
    },
  ];
  return (
    <Layout>
      <h3>Campaign Show</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column
            width={10}
          >
            <Card.Group
              items={items}
            />
          </Grid.Column>
          <Grid.Column
            width={6}
          >
            <ContributeForm
              address={address}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link
              href={`/campaigns/${address}/requests`}
            >
              <Button
                primary
                content="View Requests"
                icon="plus square outline"
              />
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

export default CampaignShow;
