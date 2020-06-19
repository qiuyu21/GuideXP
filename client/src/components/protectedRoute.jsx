import React from "react";
import { Route, Redirect } from "react-router-dom";

//protected route component
export default function Routep({
  path,
  component: Component,
  render,
  ...rest
}) {
  return;
  <Route
    {...rest}
    render={(props) => {
      const user = auth.getUser();
      if (!user) return <Redirect to="/login" />;
      return Component ? <Component {...props} user={user} /> : render(props);
    }}
  />;
}
