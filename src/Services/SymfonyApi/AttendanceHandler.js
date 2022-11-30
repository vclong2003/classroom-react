export function addAttendanceRecord(classId, attendanceData, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(`https://127.0.0.1:8000/api/classroom/${classId}/classSession`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        sessionId: localStorage.getItem("sessionId"),
      },
      body: JSON.stringify(attendanceData),
    })
      .then((response) => {
        if (response.status === 201) {
          callback();
        } else {
          console.log(response.status);
        }
      })
      .catch((err) => {
        console.log("Error add attendance " + err);
      });
  }
}

export function getAttendanceGroup(classId, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(`https://127.0.0.1:8000/api/classroom/${classId}/classSession`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        sessionId: localStorage.getItem("sessionId"),
      },
    })
      .then((response) => {
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
        console.log("Error get attendance group " + err);
      });
  }
}

export function getAttendances(classId, classSessionId, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(
      `https://127.0.0.1:8000/api/classroom/${classId}/classSession/${classSessionId}/attendances`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          sessionId: localStorage.getItem("sessionId"),
        },
      }
    )
      .then((response) => {
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
        console.log("Error get attendances " + err);
      });
  }
}
