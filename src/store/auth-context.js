import React from "react";

const AuthContext = React.createContext({
  token: "",
  isLogedIn: false,
  isUserVerified: false,
  logIn: (data) => {},
  signUp: () => {},
  logOut: () => {},
});
export default AuthContext;
