import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  DashboardOutlined,
  PictureOutlined,
  AppstoreOutlined,
  TeamOutlined,
  CreditCardOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

export default function Manager(props) {
  return (
    <Menu mode="inline">
      <Menu.Item key="dashboard" mode="inline" icon={<DashboardOutlined />}>
        <Link>Dashboard</Link>
      </Menu.Item>
      <SubMenu key="exhibit" title="Exhibit" icon={<PictureOutlined />}>
        <Menu.Item key="exhibit_list">
          <Link>Exhibit list</Link>
        </Menu.Item>
        <Menu.Item key="new_exhibit">
          <Link>New Exhibit</Link>
        </Menu.Item>
      </SubMenu>

      <SubMenu key="exhibition" title="Exhibition" icon={<AppstoreOutlined />}>
        <Menu.Item key="exhibition_list">
          <Link>Exhibition list</Link>
        </Menu.Item>
        <Menu.Item key="new_exhibition">
          <Link>New Exhibition</Link>
        </Menu.Item>
      </SubMenu>

      <SubMenu key="user" title="User" icon={<TeamOutlined />}>
        <Menu.Item key="user_list">
          <Link>User list</Link>
        </Menu.Item>
        <Menu.Item key="new_user">
          <Link>New User</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="subscription" mode="inline" icon={<CreditCardOutlined />}>
        <Link>Subscription</Link>
      </Menu.Item>
      <Menu.Item key="setting" mode="inline" icon={<SettingOutlined />}>
        <Link>Setting</Link>
      </Menu.Item>
      <Menu.Item key="logout" mode="inline" icon={<LogoutOutlined />}>
        <Link>Log out</Link>
      </Menu.Item>
    </Menu>
  );
}
