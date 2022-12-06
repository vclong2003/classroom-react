import { symfonyApiEndpoint } from "../config";
import { logout } from "./AuthHandler";

export function addClassroom(classroomName, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(`${symfonyApiEndpoint}/classroom`, {
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
        } else if (response.status === 401) {
          logout();
        } else {
          console.log(response.status);
        }
      })
      .catch((err) => {
        console.log("Error addClassroom:" + err);
      });
  }
}

export function updateClassroom(classId, classroomName, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(`${symfonyApiEndpoint}/classroom/${classId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        sessionId: localStorage.getItem("sessionId"),
      },
      body: JSON.stringify({ name: classroomName }),
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
        console.log("Error update classroom:" + err);
      });
  }
}

export function removeClassroom(classId, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(`${symfonyApiEndpoint}/classroom/${classId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        sessionId: localStorage.getItem("sessionId"),
      },
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
        console.log("Error delete classroom:" + err);
      });
  }
}

export function getClassrooms(searchVal, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(`${symfonyApiEndpoint}/classroom/?searchVal=${searchVal}`, {
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
        console.log("Error getClassroom:" + err);
      });
  }
}

export function getClassDetail(classId, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(`${symfonyApiEndpoint}/classroom/${classId}`, {
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
        console.log("Error getClassDetail:" + err);
      });
  }
}

export function joinClass(classId, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(`${symfonyApiEndpoint}/classroom/${classId}/student`, {
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
        } else if (response.status === 401) {
          logout();
        } else {
          console.log(response.status);
        }
      })
      .catch((err) => {
        console.log("Error getClassroom:" + err);
      });
  }
}

export function getStudentList(classId, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(`${symfonyApiEndpoint}/classroom/${classId}/student`, {
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
        console.log("Error get student list: " + err);
      });
  }
}

// (remove student)
export function unjoinClass(classId, studentId, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(`${symfonyApiEndpoint}/classroom/${classId}/student/${studentId}`, {
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
        } else if (response.status === 401) {
          logout();
        } else {
          console.log(response.status);
        }
      })
      .catch((err) => {
        console.log("Error delete student: " + err);
      });
  }
}
