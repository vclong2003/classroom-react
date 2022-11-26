export function getUserInfo(callback) {
  if (localStorage.getItem("sessionId")) {
    fetch("https://127.0.0.1:8000/api/user", {
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
