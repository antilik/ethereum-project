import { Table, Button } from "semantic-ui-react";
import { useRouter } from "next/router";

import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";

const RequestRow = ({ request, address, id, approversCount }) => {
  const { Row, Cell } = Table;
  const router = useRouter();
  const readyToFinalize = request.approvalCount > approversCount / 2;

  const onApproveHandler = async () => {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(id).send({
      from: accounts[0],
    });
    await router.replace(router.asPath);
  };
  const onFinalizeHandler = async () => {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(id).send({
      from: accounts[0],
    });
    await router.replace(router.asPath);
  };
  return (
    <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{request.value}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>{request.approvalCount}/{approversCount}</Cell>
      <Cell>
      {request.complete ? null :
        (<Button
          color="green"
          basic
          onClick={onApproveHandler}
        >
          Approve
        </Button>)
      }
        
      </Cell>
      <Cell>
      {request.complete ? null : 
        (<Button
            color="red"
            basic
            onClick={onFinalizeHandler}
          >
            Finalize
          </Button>)
      }
      </Cell>
    </Row>
  );
};

export default RequestRow;
