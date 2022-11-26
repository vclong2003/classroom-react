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

export function getSinglePost(classId, postId, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(`https://127.0.0.1:8000/api/classroom/${classId}/post/${postId}`, {
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
        console.log("Error get 1 post:" + err);
      });
  }
}

export function addPost(classId, isAsm, postContent, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(`https://127.0.0.1:8000/api/classroom/${classId}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        sessionId: localStorage.getItem("sessionId"),
      },
      body: JSON.stringify({ isAssignment: isAsm, content: postContent }),
    })
      .then((response) => {
        // 201: added
        if (response.status === 201) {
          callback();
        } else {
          console.log(response.status);
        }
      })
      .catch((err) => {
        console.log("Error addPost:" + err);
      });
  }
}

export function updatePost(classId, postId, isAsm, postContent, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(`https://127.0.0.1:8000/api/classroom/${classId}/post/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        sessionId: localStorage.getItem("sessionId"),
      },
      body: JSON.stringify({ isAssignment: isAsm, content: postContent }),
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
        console.log("Error update post:" + err);
      });
  }
}

export function deletePost(classId, postId, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(`https://127.0.0.1:8000/api/classroom/${classId}/post/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        sessionId: localStorage.getItem("sessionId"),
      },
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
        console.log("Error delete post:" + err);
      });
  }
}
