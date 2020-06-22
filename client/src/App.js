import React from "react";
import Login from "./components/login/login";
import Forget from "./components/login/forget";
import Index from "./components/dashboard/index";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route path="/index" component={Index} />
      <Route path="/login" component={Login} />
      <Route path="/password/reset" component={Forget} />
    </Switch>
  );
}

export default App;
