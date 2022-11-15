import { Navigate, useNavigate } from "react-router-dom";

export function login(email, password) {
  fetch("https://127.0.0.1:8000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("sessionId", data.sessionId);
      window.location.href = "/";
    })
    .catch((err) => {
      console.log(err);
    });
}

export function register(name, email, password, registeredCallback) {
  fetch("https://127.0.0.1:8000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, email: email, password: password }),
  })
    .then((response) => response.json())
    .then((msg) => {
      console.log("Success:", msg);
      registeredCallback();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export function logout() {
  localStorage.clear();
  window.location.href = "/";
}
