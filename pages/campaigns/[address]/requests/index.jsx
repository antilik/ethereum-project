import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "semantic-ui-react";

import Layout from "../../../../components/Layout";

const Requests = () => {
  const router = useRouter();
  return (
    <Layout>
      <h3>Requests</h3>
      <Link
        href={`/campaigns/${router.query.address}/requests/new`}
      >
        <Button
          primary
        >Add Request</Button>
      </Link>
    </Layout>
  );
};
export default Requests;
