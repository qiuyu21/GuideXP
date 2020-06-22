import React from "react";
import Login from "./components/login/login";
import Forget from "./components/login/forget";
import { Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
function App() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/password/reset" component={Forget} />
    </Switch>
  );
}

export default App;
