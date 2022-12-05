import { symfonyApiEndpoint } from "../config";

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
        // 200: ok
        if (response.status === 200) {
          return response.json();
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
        // 200: ok
        if (response.status === 200) {
          callback();
        } else {
          console.log(response.status);
        }
      })
      .catch((err) => {
        console.log("Error update user info: " + err);
      });
  }
}
