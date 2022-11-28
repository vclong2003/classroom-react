import React, { createContext, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./Components/NavBar";
import LoginPage from "./Pages/Authentication/Login";
import RegisterPage from "./Pages/Authentication/Register";
import { getRole } from "./Services/SymfonyApi/AuthHandler";
import AllClassPage from "./Pages/AllClass";
import "./Assets/Font.css";
import LoadingSpinner from "./Components/LoadingAnimation/Spinner";
import ProfilePage from "./Pages/Profile";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export const RoleContext = createContext();

function App() {
  const [role, setRole] = useState(null);
  useEffect(() => {
    getRole((role) => {
      setRole(role);
    });
  }, []);

  return (
    <RoleContext.Provider value={role}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/class" />} />
          <Route
            path="/class/*"
            element={
              <PrivateRoute>
                <AllClassPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </RoleContext.Provider>
  );
}

function PrivateRoute({ children }) {
  const role = useContext(RoleContext);

  if (localStorage.getItem("sessionId") === null) {
    return <Navigate to="/login" />;
  } else {
    return role === null ? <LoadingSpinner /> : children;
  }
}

reportWebVitals();
