import React, { useState, Fragment } from "react";
import { Layout, Typography, Menu } from "antd";
import "./index.css";
import Guidexp from "./menu/guidexp";
import Manager from "./menu/manager";
import Staff from "./menu/staff";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

export default function Index() {
  return (
    <Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <Header className="index-header">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Title className="index-header-title" level={3}>
              GuideXP
            </Title>
          </div>
        </Header>
        <Layout>
          <Sider
            style={{ backgroundColor: "#fff" }}
            breakpoint="sm"
            collapsedWidth={0}
            trigger={null}
          >
            <Guidexp />
          </Sider>
          <Content>CONTENT</Content>
        </Layout>
      </Layout>
    </Fragment>
  );
}
