import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './App.scss';
import { BrowserRouter, Switch } from 'react-router-dom';
// import Home from "./components/Home";
import Dashboard from './pages/DashboardPage';
import SignInPage from './pages/SignInPage';
import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = (props) => {
 

  return (
    <BrowserRouter>
      <ToastContainer />

      <Switch>
        <PublicRoute restricted={true} component={SignInPage} path="/" exact />
        {/* <PublicRoute
          restricted={true}
          component={SetNewPasswordPage}
          path="/set-password/:token"
          exact
        /> */}
        <PrivateRoute component={Dashboard} path="/dashboard" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
