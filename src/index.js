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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function PrivateRoute({ children }) {
  return localStorage.getItem("sessionId") ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

const userContext = createContext();
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("sessionId")) {
      fetch("https://127.0.0.1:8000/api/auth/verifySessionId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          sessionId: localStorage.getItem("sessionId"),
        },
      })
        .then((response) => {
          console.log(response.status); // 202: verified, 406: not verified
          if (response.status === 202) {
            return response.json();
          } else {
            <Navigate to="/" />;
            localStorage.clear();
            setUser(null);
          }
        })
        .then((data) => {
          if (data) {
            setUser(data);
          }
        })
        .catch((err) => {
          console.log("Error: " + err);
        });
    }
  }, []);
  return (
    <userContext.Provider value={user}>
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
    </userContext.Provider>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
