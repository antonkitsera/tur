import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedAdminRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem('adminToken')) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/admin",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedAdminRoute;