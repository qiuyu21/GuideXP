import React, { useState, Fragment } from "react";
import { Layout, Typography } from "antd";
import "./index.css";
import Guidexp from "./menu/guidexp";
import Manager from "./menu/manager";
import Staff from "./menu/staff";
import RoleHelper from "../../services/roleServices";
// import RouteProtected from "../protectedRoute";
import { Switch } from "react-router-dom";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

export default function Index(props) {
  const { user } = props;
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
            {/* different roles display different menus */}
            {user.Role === RoleHelper.GUIDEXP && <Guidexp />}
            {user.Role === RoleHelper.MANAGER && <Manager />}
            {user.Role === RoleHelper.STAFF && <Staff />}
          </Sider>
          <Content>
            <Switch></Switch>
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  );
}
