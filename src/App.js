import React, { useContext } from "react";
import Layout from "./components/layouts/Layout";
import NotFound from "./pages/NotFound/NotFound";
import "./assets/styles/styles.css";

import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/Forms/LoginForm";
import ForgetPassword from "./pages/ForgetPassword";
import SignUp from "./components/Forms/SignUp";
import AuthContext from "./store/auth-context";
import PriorityContainer from "./components/PriorityContainer/PrioirtyContainer";

function App() {
  
  const authCtx = useContext(AuthContext);
  console.log(authCtx)
  return (
    <>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              authCtx.isLogedIn ? (
                <PriorityContainer/>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={!authCtx.isLogedIn ?<LoginForm />: <Navigate to ="/"/>} />
          <Route path="/forget-Password" element={<ForgetPassword />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
