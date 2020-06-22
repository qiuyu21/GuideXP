import React from "react";
import Login from "./components/login/login";
import Forget from "./components/login/forget";
import Index from "./components/dashboard/index";
import { Switch, Redirect } from "react-router-dom";
import RouteProtected from "./components/protectedRoute";
import RouteUnprotected from "./components/unprotectedRoute";

function App() {
  return (
    <Switch>
      <RouteUnprotected path="/login" component={Login} />
      <RouteUnprotected path="/password/reset" component={Forget} />
      <RouteProtected exact path="/" component={Index} />
      <Redirect from="/" to="/" />
    </Switch>
  );
}

export default App;
