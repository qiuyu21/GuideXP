import React, { Fragment } from "react";
import { Layout, Typography } from "antd";
import "./index.css";
import Guidexp from "./nav/guidexp";
// import Manager from "./sider/manager";
// import Staff from "./sider/staff";
import RoleHelper from "../../helper/roleHelper";
import RouteProtected from "../protectedRoute";
// import RichEditorExample from "./editor";
import NewCustomer from "./customer/newcustomer";
import CustomerList from "./customer/customerlist";
import Dashboard from "./dashboard/dashboard";
import { Switch, Redirect, useHistory } from "react-router-dom";
import authService from "../../services/authServices";
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

export default function Index(props) {
  const { user } = props;
  let history = useHistory();

  const handleLogout = () => {
    authService.logout();
    history.push("/login");
  };

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
            {user.Role === RoleHelper.GUIDEXP && (
              <Guidexp handleLogout={handleLogout} />
            )}
            {/* {user.Role === RoleHelper.MANAGER && <Manager />}
            {user.Role === RoleHelper.STAFF && <Staff />} */}
          </Sider>
          <Content>
            <Switch>
              {user.Role === RoleHelper.GUIDEXP && (
                <RouteProtected
                  exact
                  path="/customer/new"
                  component={NewCustomer}
                />
              )}
              {user.Role === RoleHelper.GUIDEXP && (
                <RouteProtected
                  path="/customer/list"
                  component={CustomerList}
                />
              )}
              <RouteProtected path="/dashboard" component={Dashboard} />
              <Redirect from="/" to="/dashboard" component={Dashboard} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  );
}
