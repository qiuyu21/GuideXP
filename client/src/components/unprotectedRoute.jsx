import React from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "../services/authServices";

//protected route component
export default function RouteUnprotected({ path, component: Component }) {
  return (
    <Route
      path={path}
      render={(props) => {
        const user = authService.getUser();
        if (user) return <Redirect to="/" />;
        return <Component {...props} />;
      }}
    />
  );
}
