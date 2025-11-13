import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashPage from "./pages/SplashPage";
import AuthPage from "./pages/AuthPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

      

      </Routes>
    </Router>
  );
}

export default App;
