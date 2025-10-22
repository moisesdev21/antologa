import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";

//Main Layout de la Plataforma (Grid 12 Columnas / Gutter 32px
import MainLayout from "./layouts/MainLayout"
// Componentes de páginas
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";  
import Onboarding from "./pages/Onboarding";
import Experiences from "./pages/Experiences";
import Destinations from "./pages/Destinations";
import Blog from './pages/Blog';
import NavIcons from "./components/NavIcons";
import Discover from "./pages/Discover";
import Trips from "./pages/Trips";
import Pricing from "./pages/Pricing";
import Partners from "./pages/Partners";
import Support from "./pages/Support";  
import MyAccount from "./pages/MyAccount";
import LandingPage from "./pages/LandingPage";
import FloatingSupportButton from "./layouts/FloatingSupport";
import './App.css';
import './output.css';

// Función para manejar cookies
const cookieManager = {
  getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
  },
  deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
  }
};

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [showLandingPage, setShowLandingPage] = useState(false);
  const [isCheckingFirstVisit, setIsCheckingFirstVisit] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
    checkFirstVisit();
  }, []);

  const checkFirstVisit = () => {
    const hasVisitedBefore = cookieManager.getCookie('hasVisitedBefore');
    if (!hasVisitedBefore) {
      setShowLandingPage(true);
    } else {
      setShowLandingPage(false);
    }
    setIsCheckingFirstVisit(false);
  };

  const handleLandingPageComplete = () => {
    cookieManager.setCookie('hasVisitedBefore', 'true', 365);
    setShowLandingPage(false);
  };

  const skipLandingPage = () => {
    cookieManager.setCookie('hasVisitedBefore', 'true', 365);
    setShowLandingPage(false);
  };

  const resetFirstVisit = () => {
    cookieManager.deleteCookie('hasVisitedBefore');
    setShowLandingPage(true);
  };

  useEffect(() => {
    window.resetFirstVisit = resetFirstVisit;
  }, []);

  const location = useLocation();
  const hostname = window.location.hostname;

  const getBaseUrl = () => {
    if (hostname === "admins.antologa.com") return "https://admins.antologa.com";
    if (hostname === "business.antologa.com") return "https://business.antologa.com";
    return "https://antologa.com";
  };

  const baseUrl = getBaseUrl();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setCurrentUser(null);
    window.location.href = baseUrl;
  };

  if (isCheckingFirstVisit) {
    return (
      <div className="app-container min-h-screen flex items-center justify-center bg-transparent">
        <div className="text-gray-500">Cargando...</div>
      </div>
    );
  }

  if (showLandingPage && location.pathname === "/") {
    return (
      <LandingPage 
        onSkip={skipLandingPage} 
        onComplete={handleLandingPageComplete}
      />
    );
  }

  return (
    <div className="app-container min-h-screen flex flex-col overflow-hidden bg-transparent">
      {!["/register","/onboarding"].includes(location.pathname) && (
        <NavIcons currentUser={currentUser} onLogout={handleLogout} />
      )}

      <main className={["/register","/onboarding"].includes(location.pathname)}>
        <Routes>
          <Route path="/Users" element={<Users />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
          <Route path="/Experiences" element={<Experiences />} />
          <Route path="/Destinations" element={<Destinations />} />
          <Route path="/discover" element={<Discover />}>
            <Route index element={<Destinations />} />
            <Route path="destinations" element={<Destinations />} />
            <Route path="experiences" element={<Experiences />} />
          </Route>
          <Route path="/Blog" element={<Blog />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/support" element={<Support />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/landing" element={
            <LandingPage 
              onSkip={skipLandingPage} 
              onComplete={handleLandingPageComplete}
            />
          } />
          <Route path="/home" element={<Home />}/>
          <Route path="/Login-afiliados" element={<div className="flex items-center justify-center min-h-screen">Página de Login para Afiliados - En desarrollo</div>} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <FloatingSupportButton />

      {!["/register","/onboarding"].includes(location.pathname) && (
        <div className="w-full px-6 py-16 bg-white inline-flex flex-col justify-center items-center overflow-hidden">
          <div className="w-full max-w-[1200px] flex flex-col justify-center items-center gap-10">

            <div className="w-full max-w-[1200px] inline-flex justify-start items-start gap-10 flex-wrap content-start">
              <div className="flex-1 h-52 max-w-96 min-w-64 inline-flex flex-col justify-start items-start gap-6">
                <img 
                  className="w-52 h-24" 
                  src="/icons/logo.svg" 
                  alt="Company Logo" 
                />
                <div className="self-stretch text-gray-500 text-sm font-normal font-sans leading-tight">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
                </div>

                {/* Redes sociales reales */}
                <div className="inline-flex justify-center items-center gap-10 mt-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-600 transition-all duration-200 hover:scale-110"
                  >
                    <FiFacebook className="w-6 h-6" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-sky-500 transition-all duration-200 hover:scale-110"
                  >
                    <FiTwitter className="w-6 h-6" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-pink-500 transition-all duration-200 hover:scale-110"
                  >
                    <FiInstagram className="w-6 h-6" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-700 transition-all duration-200 hover:scale-110"
                  >
                    <FiLinkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>

              {/* Columnas de enlaces */}
              <div className="flex-1 min-w-64 py-2 flex justify-between items-start flex-wrap content-start">
                <div className="max-w-96 min-w-36 inline-flex flex-col justify-start items-start gap-4">
                  <div className="text-gray-500 text-sm font-normal font-sans leading-tight">Column 1</div>
                  <div className="flex flex-col justify-start items-start gap-2">
                    <div className="text-gray-500 text-sm font-normal font-sans leading-tight">Blog</div>
                    <div className="text-gray-500 text-sm font-normal font-sans leading-tight">Jobs</div>
                    <div className="text-gray-500 text-sm font-normal font-sans leading-tight">Press</div>
                    <div className="text-gray-500 text-sm font-normal font-sans leading-tight">Accessibility</div>
                  </div>
                </div>

                <div className="max-w-96 min-w-36 inline-flex flex-col justify-start items-start gap-4">
                  <div className="text-gray-500 text-sm font-normal font-sans leading-tight">Column 2</div>
                  <div className="flex flex-col justify-start items-start gap-2">
                    <div className="text-gray-500 text-sm font-normal font-sans leading-tight">Blog</div>
                    <div className="text-gray-500 text-sm font-normal font-sans leading-tight">Jobs</div>
                    <div className="text-gray-500 text-sm font-normal font-sans leading-tight">Press</div>
                    <div className="text-gray-500 text-sm font-normal font-sans leading-tight">Accessibility</div>
                    <div className="text-gray-500 text-sm font-normal font-sans leading-tight">Partners</div>
                  </div>
                </div>

                <div className="max-w-96 min-w-36 inline-flex flex-col justify-start items-start gap-4">
                  <div className="text-gray-500 text-sm font-normal font-sans leading-tight">Column 3</div>
                  <div className="flex flex-col justify-start items-start gap-2">
                    <div className="text-gray-500 text-sm font-normal font-sans leading-tight">Blog</div>
                    <div className="text-gray-500 text-sm font-normal font-sans leading-tight">Jobs</div>
                    <div className="text-gray-500 text-sm font-normal font-sans leading-tight">Press</div>
                  </div>
                </div>

                <div className="max-w-96 min-w-36 inline-flex flex-col justify-start items-start gap-4">
                  <div className="text-gray-500 text-sm font-normal font-sans leading-tight">Column 4</div>
                  <div className="flex flex-col justify-start items-start gap-2">
                    <div className="text-gray-500 text-sm font-normal font-sans leading-tight">Blog</div>
                    <div className="text-gray-500 text-sm font-normal font-sans leading-tight">Jobs</div>
                    <div className="text-gray-500 text-sm font-normal font-sans leading-tight">Press</div>
                    <div className="text-gray-500 text-sm font-normal font-sans leading-tight">Accessibility</div>
                    <div className="text-gray-500 text-sm font-normal font-sans leading-tight">Partners</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="self-stretch text-center text-gray-500 text-sm font-normal font-sans leading-tight">
              © 2025 Antologa, Inc. All rights reserved.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
