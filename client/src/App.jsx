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
import RewardsPage from "./pages/RewardsPage";
import SettingsPage from "./pages/SettingsPage";
import WishlistPage from "./pages/WishlistPage";
import LanguageFlags from "./components/LanguageFlags";
import EditProfilePage from "./pages/EditProfilePage";
import Footer from "./components/Footer";
import TravelGalleryPage from "./pages/TravelGalleryPage";








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
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/languageflags" element={<LanguageFlags />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/travel-gallery" element={<TravelGalleryPage />} />



        



      </Routes>
      <Footer />
    </Router>
    
  );
}

export default App;

