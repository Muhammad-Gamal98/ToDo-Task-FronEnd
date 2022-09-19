import { useReducer } from "react";
import AuthContext from "./auth-context";

const getCookieName = (name) => {
  var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[0].split("=");
};
const initialState = {
  token: "",
  isLogedIn: false,
  isUserVerified: false,
};
getCookieName("jwt") &&
  getCookieName("jwt")[0] === " jwt" &&
  (initialState.token = getCookieName("jwt")[1]) &&
  (initialState.isLogedIn = true) &&
  (initialState.isUserVerified = true);
console.log(initialState);
const authReducer = (state, action) => {
  if (action.type === "LOGIN") {
    console.log(action.payload.status !== "notVerified");
    if (action.payload.status !== "notVerified") {
      const updatedToken = action.payload.token;
      const updatedIsLogedIn = true;
      const updatesIsUserVerified = action.payload.data.verified;
      return {
        token: updatedToken,
        isLogedIn: updatedIsLogedIn,
        isUserVerified: updatesIsUserVerified,
      };
    }
  } else if (action.type === "SIGNUP") {
    console.log(action.payload);
  } else if (action.type === "LOGOUT") {
    document.cookie = "jwt" + "=; Max-Age=0";
    document.cookie = "jwtExpires" + "=; Max-Age=0";
    return {
      token: "",
      isLogedIn: false,
      isUserVerified: false,
    };
  }
  return {
    token: "",
    isLogedIn: false,
    isUserVerified: false,
  };
};
const AuthProvider = (props) => {
  const [authState, dispatchAuthState] = useReducer(authReducer, initialState);
  const logInHandler = (data) => {
    dispatchAuthState({ type: "LOGIN", payload: data });
  };
  const signUpHandler = (data) => {
    dispatchAuthState({ type: "SIGNUP", payload: data });
  };
  const logOutHandler = () => {
    dispatchAuthState({ type: "LOGOUT" });
  };
  const authContext = {
    token: authState.token,
    isLogedIn: authState.isLogedIn,
    isUserVerified: authState.isUserVerified,
    logIn: logInHandler,
    signUp: signUpHandler,
    logOut: logOutHandler,
  };
  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
