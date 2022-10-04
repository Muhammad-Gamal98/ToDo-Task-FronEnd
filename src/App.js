import React, { useContext } from "react";
import Layout from "./components/layouts/Layout";
import NotFound from "./pages/NotFound/NotFound";
import "./assets/styles/styles.css";

import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/Forms/LoginForm";
import ForgetPassword from "./pages/ForgetPassword";
import SignUp from "./components/Forms/SignUp";
import AuthContext from "./store/auth-context";
import TaskList from "./components/TaskList/TaskList";
import { VerifiyEmail } from "./components/Email/VerifiyEmail";
import ResetPassword from "./components/Forms/ResetPassword";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              authCtx.isLogedIn ? <TaskList /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/login"
            element={!authCtx.isLogedIn ? <LoginForm /> : <Navigate to="/" />}
          />
          <Route
            path="/tasks"
            element={authCtx.isLogedIn ? <TaskList /> : <Navigate to="/" />}
          />
          <Route
            path="/forget-Password"
            element={
              !authCtx.isLogedIn ? <ForgetPassword /> : <Navigate to="/" />
            }
          />
          <Route
            path="/signup"
            element={!authCtx.isLogedIn ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="api/v1/user/verifyaccount/:id/:token"
            element={<VerifiyEmail />}
          />
          <Route
            path="api/v1/user/resetpassword/:id/:token"
            element={<ResetPassword />}
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
