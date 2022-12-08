import { symfonyApiEndpoint } from "../config";
import { logout } from "./AuthHandler";

export function getUserInfo(callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(`${symfonyApiEndpoint}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        sessionId: localStorage.getItem("sessionId"),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          logout();
        } else {
          console.log(response.status);
        }
      })
      .then((data) => {
        if (data) {
          callback(data);
        }
      })
      .catch((err) => {
        console.log("Error get user info: " + err);
      });
  }
}

export function updateUserInfo(
  name,
  dob,
  phoneNumber,
  address,
  imageUrl,
  callback
) {
  if (localStorage.getItem("sessionId")) {
    fetch(`${symfonyApiEndpoint}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        sessionId: localStorage.getItem("sessionId"),
      },
      body: JSON.stringify({
        name: name,
        dob: dob,
        phoneNumber: phoneNumber,
        address: address,
        imageUrl: imageUrl,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          callback();
        } else if (response.status === 401) {
          logout();
        } else {
          console.log(response.status);
        }
      })
      .catch((err) => {
        console.log("Error update user info: " + err);
      });
  }
}

export function setUserRole(role, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(`${symfonyApiEndpoint}/user/role`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        sessionId: localStorage.getItem("sessionId"),
      },
      body: JSON.stringify({
        role: role,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          callback();
        } else if (response.status === 401) {
          logout();
        } else {
          console.log(response.status);
        }
      })
      .catch((err) => {
        console.log("Error set role: " + err);
      });
  }
}
