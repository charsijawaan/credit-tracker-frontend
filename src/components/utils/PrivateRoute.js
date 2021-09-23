import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ exact, path, component }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? (
    <Route exact={exact} path={path} component={component} />
  ) : (
    <Redirect to="/" />
  );
};

export default PrivateRoute;
