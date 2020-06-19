import React from "react";
import Login from "./components/login/login";
import { Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
function App() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
    </Switch>
  );
}

export default App;
