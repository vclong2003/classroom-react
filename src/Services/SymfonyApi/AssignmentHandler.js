import { symfonyApiEndpoint } from "../config";

export function getAllAsm(classId, postId, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(
      `${symfonyApiEndpoint}/classroom/${classId}/post/${postId}/assignment`,
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
        console.log("Error get all asm " + err);
      });
  }
}

export function getSingleAsm(classId, postId, asmId, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(
      `${symfonyApiEndpoint}/classroom/${classId}/post/${postId}/assignment/${asmId}`,
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
        console.log("Error get single asm " + err);
      });
  }
}

export function addAsm(classId, postId, asmFileUrl, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(
      `${symfonyApiEndpoint}/classroom/${classId}/post/${postId}/assignment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          sessionId: localStorage.getItem("sessionId"),
        },
        body: JSON.stringify({ fileUrl: asmFileUrl }),
      }
    )
      .then((response) => {
        if (response.status === 201) {
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
        console.log("Error add asm " + err);
      });
  }
}

export function updateAsm(classId, postId, asmId, asmFileUrl, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(
      `${symfonyApiEndpoint}/classroom/${classId}/post/${postId}/assignment/${asmId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          sessionId: localStorage.getItem("sessionId"),
        },
        body: JSON.stringify({ fileUrl: asmFileUrl }),
      }
    )
      .then((response) => {
        if (response.status === 200) {
          callback();
        } else {
          console.log(response.status);
        }
      })
      .catch((err) => {
        console.log("Error update asm " + err);
      });
  }
}

export function deleteAsm(classId, postId, asmId, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(
      `${symfonyApiEndpoint}/classroom/${classId}/post/${postId}/assignment/${asmId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          sessionId: localStorage.getItem("sessionId"),
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          callback();
        } else {
          console.log(response.status);
        }
      })
      .catch((err) => {
        console.log("Error delete asm " + err);
      });
  }
}

export function setAsmMark(classId, postId, asmId, asmMark, callback) {
  if (localStorage.getItem("sessionId")) {
    fetch(
      `${symfonyApiEndpoint}/classroom/${classId}/post/${postId}/assignment/${asmId}/mark`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          sessionId: localStorage.getItem("sessionId"),
        },
        body: JSON.stringify({ mark: asmMark }),
      }
    )
      .then((response) => {
        if (response.status === 200) {
          callback();
        } else {
          console.log(response.status);
        }
      })
      .catch((err) => {
        console.log("Error set asm mark " + err);
      });
  }
}
