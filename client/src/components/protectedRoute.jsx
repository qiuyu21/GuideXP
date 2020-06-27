import React from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "../services/authServices";

//protected route component
export default function RouteProtected({
  path,
  component: Component,
  render,
  ...rest
}) {
  return (
    <Route
      render={(props) => {
        const user = authService.getUser();
        if (!user) return <Redirect to="/login" />;
        return Component ? (
          <Component {...props} user={user} {...rest} />
        ) : (
          render(props)
        );
      }}
    />
  );
}
