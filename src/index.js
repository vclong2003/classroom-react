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
import Classes from "./Pages/Classes";
import { verifySessionId } from "./Services/SymfonyApi/AuthHandler";

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
      <NavBar />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Classes />
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
