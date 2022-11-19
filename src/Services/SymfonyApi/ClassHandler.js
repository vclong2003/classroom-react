export function addClassroom(classroomName, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch("https://127.0.0.1:8000/api/classroom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        sessionId: localStorage.getItem("sessionId"),
      },
      body: JSON.stringify({ name: classroomName }),
    })
      .then((response) => {
        // 201: created
        if (response.status === 201) {
          callback();
        }
      })
      .catch((err) => {
        console.log("Error addClassroom:" + err);
      });
  }
}

export function getClassroom(callback) {
  if (localStorage.getItem("sessionId")) {
    fetch("https://127.0.0.1:8000/api/classroom", {
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
        console.log("Error getClassroom:" + err);
      });
  }
}

export function getClassDetail(classId, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(`https://127.0.0.1:8000/api/classroom/${classId}`, {
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
        console.log("Error getClassroom:" + err);
      });
  }
}

export function addStudent(classId, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(`https://127.0.0.1:8000/api/classroom/${classId}/student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        sessionId: localStorage.getItem("sessionId"),
      },
    })
      .then((response) => {
        // 200: ok
        if (response.status === 200) {
          callback();
        }
      })
      .catch((err) => {
        console.log("Error getClassroom:" + err);
      });
  }
}

export function getStudentList(classId) {
  if (localStorage.getItem("sessionId")) {
    fetch(`https://127.0.0.1:8000/api/classroom/${classId}/student`, {
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
          //console.log(data);
        }
      })
      .catch((err) => {
        console.log("Error getClassroom:" + err);
      });
  }
}
