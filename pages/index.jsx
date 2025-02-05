import factory from '../ethereum/factory';

export const getServerSideProps = (async () => {
  const deployedCampaigns = await factory.methods.getDeployedCampaigns().call();
  return { props: { deployedCampaigns } }
});

const MainPage = ({ deployedCampaigns }) => {

  return (
    <>
      {deployedCampaigns.length > 0 ? (
        <h1>The contract was deployed to address: {deployedCampaigns?.[0]}</h1>
      ) : (
        <h1>There is no deployed contract.</h1>
      )}
    </>

  );
};

export default MainPage;
