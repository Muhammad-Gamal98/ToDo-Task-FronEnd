import React from "react";
import Layout from "./components/layouts/Layout";
import NotFound from "./pages/NotFound/NotFound";
import "./assets/styles/styles.css";

import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/Forms/LoginForm";
import ForgetPassword from "./pages/ForgetPassword";
import SignUp from "./components/Forms/SignUp";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forget-Password" element={<ForgetPassword />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
