import React, { useEffect } from "react";
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
import { verifySessionId } from "./Services/SymfonyApi/AuthHandler";
import AllClassPage from "./Pages/AllClass";
import "./Assets/Font.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  useEffect(() => {
    verifySessionId();
  }, []);

  return (
    <>
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </>
  );
}

function PrivateRoute({ children }) {
  return localStorage.getItem("sessionId") ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

reportWebVitals();
