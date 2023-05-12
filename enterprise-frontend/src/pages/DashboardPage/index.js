import React, { useEffect } from "react";
import { Layout } from "antd";
import { getCurrentUser, logout } from "../../services/auth";
import { Switch, Link, Route } from "react-router-dom";
import { dashboardRoutes as routes } from "../../utils/routes";
import AvatarPlaceholder from "../../assets/place-holder-avatar.jpg";

import {
  HomeOutlined,
  DingdingOutlined,
  TeamOutlined,
  SolutionOutlined,
  GlobalOutlined,
  LoginOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";

const DashboardPage = (props) => {
  const { Header, Footer, Sider, Content } = Layout;

  useEffect(() => {
    if (!getCurrentUser()) {
      window.location = "/";
    }
  }, []);

  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Sider
          style={{
            backgroundImage: "linear-gradient(to right, #391326 , purple)",
            color: "white",
          }}
        >
          <div
            style={{
              height: "64px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "#391326",
              //   cursor: "pointer",
            }}
          >
            <img
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                display: "block",
                // padding: "20px",
              }}
              src={AvatarPlaceholder}
              alt="avatar-placeholder"
            />{" "}
            <div>{getCurrentUser() ? getCurrentUser().name : ''}</div>
            {/* <LoginOutlined
              style={{
                height: "64px",
                width: "100%",
                display: "block",
                padding: "20px",
                fontSize: "25px",
              }}
            /> */}
          </div>
          <ul
            style={{ listStyleType: "none", padding: 0 }}
            className="left-site-bar"
          >
            <li>
              <Link to="/">
                <HomeOutlined style={{ paddingRight: '10px' }} />
                {"\t"}
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard/customers">
                <DingdingOutlined style={{ paddingRight: '10px' }} />
                {"\t"}Customers
              </Link>
            </li>
            <li>
              <Link to="/dashboard/Medicines">
                <TeamOutlined style={{ paddingRight: '10px' }} />
                {"\t"}Inventory
              </Link>
            </li>
            <li>
              <Link to="/dashboard/accounts">
                <SolutionOutlined style={{ paddingRight: '10px' }} />
                {"\t"}Accounts
              </Link>
            </li>
            <li>
              <Link to="/dashboard/sales">
                <GlobalOutlined style={{ paddingRight: '10px' }} />
                {"\t"}Sales
              </Link>
            </li>
            <li>
              <Link to="/dashboard/stores">
                <GlobalOutlined style={{ paddingRight: '10px' }} />
                {"\t"}Stores
              </Link>
            </li>

            <li>
              <Link to="/" onClick={() => logout()}>
                <LoginOutlined style={{ paddingRight: '10px' }} />
                {"\t"}Log out
              </Link>
            </li>
          </ul>
        </Sider>
        <Layout>
          <Header
            style={{
              backgroundImage: "linear-gradient(to bottom, #391326 , purple)",
            }}
          >
            <h1
              style={{ fontSize: "20px", margin: "0 0 15px 0", color: "white" }}
            >
              <RadarChartOutlined />
              {"\t"}
              PharmaZeal
            </h1>
          </Header>
          <Content style={{ overflowY: "scroll" }}>
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={<route.sidebar />}
                />
              ))}
            </Switch>
          </Content>
          {/* <Footer>Footer</Footer> */}
        </Layout>
      </Layout>
    </div>
  );
};

export default DashboardPage;
