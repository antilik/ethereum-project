import { Menu } from "semantic-ui-react";
import Link from "next/link";

const Header = () => {
  return (
    <Menu
      style={{
        marginTop: "15px",
      }}
    >
      <Menu.Item>
        <Link href="/">PeopleCoin</Link>
      </Menu.Item>
      <Menu.Menu position="right" />
      <Menu.Item>
        <Link href="/">Campaigns</Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/campaigns/new">+</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Header;
