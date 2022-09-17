import { useReducer } from "react";
import AuthContext from "./auth-context";

const initialState = {
  token: "",
  isLogedIn: false,
  isUserVerified: false,
};
document.cookie &&
  (initialState.token = document.cookie) &&
  (initialState.isLogedIn = true);

const authReducer = (state, action) => {
  if (action.type === "LOGIN") {
    console.log(action.payload);
    const updatedToken = action.payload.token;
    const updatedIsLogedIn = true;
    const updatesIsUserVerified = action.payload.data.verified;
    console.log(updatedToken, updatedIsLogedIn, document.cookie);
    return {
      token: updatedToken,
      isLogedIn: updatedIsLogedIn,
      isUserVerified: updatesIsUserVerified,
    };
  }
  if (action.type === "LOGOUT") {
    document.cookie = "jwt" + "=; Max-Age=0";
    console.log("logout", document.cookie);
    return initialState;
  }
  return initialState;
};
const AuthProvider = (props) => {
  console.log("cookie", document.cookie);
  const [authState, dispatchAuthState] = useReducer(authReducer, initialState);
  console.log(authState);
  const logInHandler = (data) => {
    dispatchAuthState({ type: "LOGIN", payload: data });
  };
  const signUpHandler = () => {};
  const logOutHandler = () => {};
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
