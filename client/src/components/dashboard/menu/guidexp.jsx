import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  DashboardOutlined,
  PictureOutlined,
  AppstoreOutlined,
  BankOutlined,
  TeamOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

export default function Guidexp() {
  return (
    <Menu mode="inline">
      <Menu.Item key="dashboard" mode="inline" icon={<DashboardOutlined />}>
        <Link>Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="exhibit" mode="inline" icon={<PictureOutlined />}>
        <Link>Exhibit</Link>
      </Menu.Item>
      <Menu.Item key="exhibition" mode="inline" icon={<AppstoreOutlined />}>
        <Link>Exhibition</Link>
      </Menu.Item>
      <SubMenu key="customer" title="Customer" icon={<BankOutlined />}>
        <Menu.Item key="customer_list">
          <Link>Customer List</Link>
        </Menu.Item>
        <Menu.Item key="new_customer">
          <Link>New Customer</Link>
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
      <Menu.Item key="setting" mode="inline" icon={<SettingOutlined />}>
        <Link>Setting</Link>
      </Menu.Item>
      <Menu.Item key="logout" mode="inline" icon={<LogoutOutlined />}>
        <Link>Log out</Link>
      </Menu.Item>
    </Menu>
  );
}
