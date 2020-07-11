import React, { Fragment, useState } from "react";
import { Layout, Typography, Spin } from "antd";
import "./index.css";
import Guidexp from "./menu/guidexp";
import Manager from "./menu/manager";
// import Staff from "./sider/staff";
import RoleHelper from "../../helper/roleHelper";
//Route GUIDEXP
import GuidexpRoutes from "./routes/guidexp";
//Route MANAGER
import ManagerRoutes from "./routes/manager";
import { useHistory } from "react-router-dom";
import authService from "../../services/authServices";
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

export default function Index(props) {
  const { user } = props;
  const [loading, setLoading] = useState(false);
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
            {user.Role === RoleHelper.GUIDEXP && <Guidexp handleLogout={handleLogout} />}
            {user.Role === RoleHelper.MANAGER && <Manager handleLogout={handleLogout} />}
            {/* {user.Role === RoleHelper.STAFF && <Staff /> } */}
          </Sider>
          <Content>
            {loading && <div className="spinner"><Spin /></div>}
            {user.Role === RoleHelper.GUIDEXP && <GuidexpRoutes setLoading={setLoading} />}
            {user.Role === RoleHelper.MANAGER && <ManagerRoutes setLoading={setLoading} />}
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  );
}
