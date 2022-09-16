import { useReducer } from "react";
import AuthContext from "./auth-context";

const initialState = {
  token: "",
  isLogedIn: false,
  isUserVerified: false,
};
const authReducer = (state, action) => {
  if (action.type === "LOGIN") {
    console.log(action.payload);
    const updatedToken = action.payload.token;
    const updatesIsLogedIn = true;
    console.log(updatedToken, updatesIsLogedIn);
    return {
      token: updatedToken,
      isLogedIn: updatesIsLogedIn,
      ...state,
    };
  }
  return initialState;
};
const AuthProvider = (props) => {
  const [authState, dispatchAuthState] = useReducer(authReducer, initialState);

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
