import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashPage from "./pages/SplashPage";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/signup" element={<div>Signup Page Placeholder</div>} />
        <Route path="/login" element={<div>Login Page Placeholder</div>} />
      </Routes>
    </Router>
  );
}

export default App;
