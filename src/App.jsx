import React, { useState } from 'react';
import './style.css';
import SplashScreen from "./pages/SplashScreen/SplashScreen";
import Login from "./pages/Login/Login";
import HomeScreen1 from "./pages/Home/HomeScreen1";

export default function App() {
  const [view, setView] = useState('splash');

  return (
    <div className="app-container">
      {view === 'splash' && (
        <SplashScreen onComplete={() => setView('login')} />
      )}
      {view === 'login' && (
        <Login setView={setView} />
      )}
      {view === 'home1' && (
        <HomeScreen1 setView={setView} />
      )}
    </div>
  );
}
