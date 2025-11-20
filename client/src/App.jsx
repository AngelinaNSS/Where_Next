import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashPage from "./pages/SplashPage";
import AuthPage from "./pages/AuthPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import VideoPage from "./pages/VideoPage";
import BlogPage from "./pages/BlogPage";
import TravelMap from "./pages/TravelPage";
import SearchResults from "./pages/SearchResults"; 
import DestinationPage from "./pages/DestinationPage"; 
import ProgressPage from "./pages/ProgressPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/blog/:blogId" element={<BlogPage />} />
        <Route path="/travel-map" element={<TravelMap />} />
        <Route path="/search/:query" element={<SearchResults />} /> 
        <Route path="/destination/:id" element={<DestinationPage />} />
        <Route path="/progress" element={<ProgressPage />} />



      </Routes>
    </Router>
  );
}

export default App;

