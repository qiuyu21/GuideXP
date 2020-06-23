import React, { useState, useEffect, Fragment } from "react";
import { Layout, Typography } from "antd";
import "./index.css";
import Guidexp from "./sider/guidexp";
import Manager from "./sider/manager";
import Staff from "./sider/staff";
import RoleHelper from "../../services/roleServices";
import RouteProtected from "../protectedRoute";
// import RichEditorExample from "./editor";
import NewCustomer from "./customer/newcustomer";
import Dashboard from "./dashboard/dashboard";
import { Switch, Redirect } from "react-router-dom";
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

export default function Index(props) {
  const { user } = props;
  user.Role = RoleHelper.GUIDEXP;
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
            <div className="dashboard-content-container">
              <Switch>
                {user.Role === RoleHelper.GUIDEXP && (
                  <RouteProtected
                    exact
                    path="/customer/new"
                    component={NewCustomer}
                  />
                )}
                <RouteProtected path="/dashboard" component={Dashboard} />
                <Redirect from="/" to="/dashboard" component={Dashboard} />
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  );
}
