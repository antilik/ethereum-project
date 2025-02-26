import Link from "next/link";
import { Button, Table } from "semantic-ui-react";

import Layout from "../../../../components/Layout";
import Campaign from "../../../../ethereum/campaign";
import RequestRow from "../../../../components/RequestRow";

import web3 from "../../../../ethereum/web3";

export const getServerSideProps = (async (context) => {
  const address = context.params.address;
  const campaign =  Campaign(address);
  const requestCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  const requests = await Promise.all(Array(parseInt(requestCount)).fill().map((element, index) => {
    return campaign.methods.requests(index).call();
  }))

  const requestsSerialized = requests.map((request) => ({
  ...request,
    '1': parseInt(request['1']),
    '4': parseInt(request['4']),
    value: web3.utils.fromWei(parseInt(request['value']), 'ether'),
    approvalCount: parseInt(request['approvalCount']),
  }));

  return {
    props: {
      requestCount: (requestCount).toString(),
      requests: requestsSerialized,
      address: address,
      approversCount: parseInt(approversCount),
    },
  };
});
const Requests = ({ address, requestCount, requests, approversCount }) => {
  const { Header, Row, HeaderCell, Body } = Table;

  return (
    <Layout>
      <h3>Requests</h3>
      <Link
        href={`/campaigns/${address}/requests/new`}
      >
        <Button
          primary
          floated="right"
          style={{ marginBottom: 10 }}
        >Add Request</Button>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
          {
            requests.map((request, index) => (
              <RequestRow
                key={index}
                id={index}
                request={request}
                address={address}
                approversCount={approversCount}
              />
            ))
          }
        </Body>

      </Table>
      <div>Found {requestCount} requests.</div>
    </Layout>
  );
};
export default Requests;
