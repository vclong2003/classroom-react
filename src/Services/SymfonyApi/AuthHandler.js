import { symfonyApiEndpoint } from "../config";

export function register(name, email, password, registeredCallback) {
  fetch(`${symfonyApiEndpoint}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Register: ", data);
      registeredCallback();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export function login(email, password) {
  fetch(`${symfonyApiEndpoint}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((data) => {
      if (data) {
        localStorage.setItem("sessionId", data.sessionId);
        window.location.href = "/";
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function logout() {
  localStorage.clear();
  window.location.href = "/";
}

//Verify the sessionId and get role
export function getRole(callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(`${symfonyApiEndpoint}/auth/role`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        sessionId: localStorage.getItem("sessionId"),
      },
    })
      .then((response) => {
        // 202: verified, 401: not verified
        if (response.status === 202) {
          return response.json();
        } else {
          logout();
        }
      })
      .then((data) => {
        if (data) {
          callback(data.role);
        }
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  }
}
