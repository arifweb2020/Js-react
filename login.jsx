import React from "react";
https://stackoverflow.com/questions/67743282/prevent-user-from-go-back-to-the-login-page-when-user-logged-in-react-js

import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  var login = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) => {
        if (login) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

Example Usage : <ProtectedRoute path="/dashboard" exact component={Dashboard} />.
This will redirect the user to /dashboard after Login.

And for user to prevent going back to the login screen you can implement check something like this in your routes.js

var isLoggedIn = localStorage.getItem("token");

<Route path="/" exact component={isLoggedIn ? Dashboard : Login} />
