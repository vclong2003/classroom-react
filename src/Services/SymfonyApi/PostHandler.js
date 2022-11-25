export function getPosts(classId, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(`https://127.0.0.1:8000/api/classroom/${classId}/post`, {
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
        }
      })
      .then((data) => {
        if (data) {
          callback(data);
        }
      })
      .catch((err) => {
        console.log("Error getPost:" + err);
      });
  }
}

export function addPost(classId, isAsm, content, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(`https://127.0.0.1:8000/api/classroom/${classId}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        sessionId: localStorage.getItem("sessionId"),
      },
    })
      .then((response) => {
        // 200: ok
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          callback(data);
        }
      })
      .catch((err) => {
        console.log("Error getPost:" + err);
      });
  }
}
