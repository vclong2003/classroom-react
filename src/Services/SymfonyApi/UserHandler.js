export function getRole(callback) {
    if (localStorage.getItem("sessionId")) {
      fetch("https://127.0.0.1:8000/api/user/role", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          sessionId: localStorage.getItem("sessionId"),
        },
      })
        .then((response) => {
          // 202: verified, 406: not verified
          if (response.status === 202) {
            return response.json();
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
  