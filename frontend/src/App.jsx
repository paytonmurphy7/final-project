import { useState } from "react";
import { clearToken, getToken, getUsername } from "./tokenStorage.js";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import Homepage from "./components/Homepage.jsx";

export default function App() {
  const savedToken = getToken();
  const savedUsername = getUsername();

  const [hasToken, setHasToken] = useState(!!savedToken);
  const [mode, setMode] = useState("login"); 

  function handleLoggedIn() {
    setHasToken(true);
    setMode("home");
  }

  function handleLogout() {
    clearToken();
    setHasToken(false);
    setMode("login");
  }

  if (!hasToken) {
    if (mode === "register") {
      return <Register onSwitchToLogin={() => setMode("login")} />;
    }
    return <Login handleLoggedIn={handleLoggedIn} onSwitchToRegister={() => setMode("register")} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar handleLogout={handleLogout} username={savedUsername} />
      <Homepage username={savedUsername} />
    </div>
  );
}
