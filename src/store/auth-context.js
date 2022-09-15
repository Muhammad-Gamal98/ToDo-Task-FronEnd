import { createContext, useState } from "react";
import { calculateRemainingTime } from "../utils/calculation";

const AuthContext = createContext({
  isLoggedIn: false,
  token: "",
  verified: "",
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const userIsLogged = false;
  const userIsVerified = false;

  const logoutHandler = () => {
    console.log("Logout");
  };
  const loginHandler = () => {
    console.log("Login");
  };

  const contextValue = {
    isLoggedIn: userIsLogged,
    token,
    verified: userIsVerified,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};
