import React, { useState } from "react";
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

export default function Guidexp({ handleLogout }) {

  return (
    <Menu mode="inline">
      <Menu.Item key="dashboard" mode="inline" icon={<DashboardOutlined />}>
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="exhibit" mode="inline" icon={<PictureOutlined />}>
        <Link to="#">Exhibit</Link>
      </Menu.Item>
      <Menu.Item key="exhibition" mode="inline" icon={<AppstoreOutlined />}>
        <Link to="#">Exhibition</Link>
      </Menu.Item>
      <SubMenu key="customer" title="Customer" icon={<BankOutlined />}>
        <Menu.Item key="customer_list">
          <Link to="/customer/list">Customer List</Link>
        </Menu.Item>
        <Menu.Item key="new_customer">
          <Link to="/customer/new">New Customer</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="user" mode="inline" icon={<TeamOutlined />}>
        <Link to="#">User</Link>
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
