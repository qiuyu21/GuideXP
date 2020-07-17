import React, { useState } from "react";
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

export default function Manager({ handleLogout }) {

  const rootSubmenuKeys = ["exhibit", "exhibition", "user"];

  const [currentOpenKeys, setCurrentOpenKeys] = useState([]);

  const onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => currentOpenKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setCurrentOpenKeys(openKeys);
    } else {
      setCurrentOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  }

  return (
    <Menu mode="inline" onOpenChange={onOpenChange} openKeys={currentOpenKeys}>
      <Menu.Item key="dashboard" mode="inline" icon={<DashboardOutlined />}>
        <Link to="#">Dashboard</Link>
      </Menu.Item>
      <SubMenu key="exhibit" title="Exhibit" icon={<PictureOutlined />}>
        <Menu.Item key="new_exhibit">
          <Link to="/exhibit/new">New Exhibit</Link>
        </Menu.Item>
        <Menu.Item key="exhibit_list">
          <Link to="/exhibit/list">Exhibit list</Link>
        </Menu.Item>
      </SubMenu>

      <SubMenu key="exhibition" title="Exhibition" icon={<AppstoreOutlined />}>
        <Menu.Item key="new_exhibition">
          <Link to="/exhibition/new">New Exhibition</Link>
        </Menu.Item>
        <Menu.Item key="exhibition_list">
          <Link to="#">Exhibition list</Link>
        </Menu.Item>
      </SubMenu>

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
      <Menu.Item key="profile" mode="inline" icon={<SettingOutlined />}>
        <Link to="#">Profile</Link>
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
