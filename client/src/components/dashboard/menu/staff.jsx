import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  DashboardOutlined,
  PictureOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

export default function Staff(props) {
  return (
    <Menu>
      <Menu.Item key="dashboard" mode="inline" icon={<DashboardOutlined />}>
        <Link>Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="exhibit" mode="inline" icon={<PictureOutlined />}>
        <Link>Exhibit</Link>
      </Menu.Item>
      <Menu.Item key="exhibition" mode="inline" icon={<AppstoreOutlined />}>
        <Link>Exhibition</Link>
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
