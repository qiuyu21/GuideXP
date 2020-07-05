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
  TranslationOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

export default function Manager({ handleLogout }) {
  return (
    <Menu mode="inline">
      <Menu.Item key="dashboard" mode="inline" icon={<DashboardOutlined />}>
        <Link to="#">Dashboard</Link>
      </Menu.Item>
      <SubMenu key="exhibit" title="Exhibit" icon={<PictureOutlined />}>
        <Menu.Item key="new_exhibit">
          <Link to="/exhibit/new">New Exhibit</Link>
        </Menu.Item>
        <Menu.Item key="exhibit_list">
          <Link to="#">Exhibit list</Link>
        </Menu.Item>
      </SubMenu>

      <SubMenu key="exhibition" title="Exhibition" icon={<AppstoreOutlined />}>
        <Menu.Item key="new_exhibition">
          <Link to="#">New Exhibition</Link>
        </Menu.Item>
        <Menu.Item key="exhibition_list">
          <Link to="#">Exhibition list</Link>
        </Menu.Item>
      </SubMenu>

      <Menu.Item key="translation" mode="inline" icon={<TranslationOutlined />}>
        <Link to="#">Translation</Link>
      </Menu.Item>

      <SubMenu key="user" title="User" icon={<TeamOutlined />}>
        <Menu.Item key="user_list">
          <Link to="#">User list</Link>
        </Menu.Item>
        <Menu.Item key="new_user">
          <Link to="#">New User</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="subscription" mode="inline" icon={<CreditCardOutlined />}>
        <Link to="#">Subscription</Link>
      </Menu.Item>
      <Menu.Item key="setting" mode="inline" icon={<SettingOutlined />}>
        <Link to="#">Setting</Link>
      </Menu.Item>
      <Menu.Item
        key="logout"
        mode="inline"
        icon={<LogoutOutlined />}
        onClick={handleLogout}
      >
        Log out
      </Menu.Item>
    </Menu>
  );
}
