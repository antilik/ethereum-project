import { Menu } from "semantic-ui-react";

const Header = () => {
  return (
    <Menu
      style={{
        marginTop: "15px",
      }}
    >
      <Menu.Item>
        PeopleCoin
      </Menu.Item>
      <Menu.Menu position="right" />
      <Menu.Item>
        Campaigns
      </Menu.Item>
      <Menu.Item>
        +
      </Menu.Item>
    </Menu>
  );
};

export default Header;
