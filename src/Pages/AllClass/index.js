import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { Routes, Route } from "react-router-dom";
import { getRole } from "../../Services/SymfonyApi/AuthHandler";
import TeacherClassesPage from "./TeacherClassPage";

export default function AllClassPage() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    getRole((role) => {
      setRole(role);
    });
  }, []);

  return (
    <Routes>
      <Route
        path=""
        element={
          role == null ? (
            <Container
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "50px",
              }}
            >
              <Spinner animation="border" />
            </Container>
          ) : role === "teacher" ? (
            <TeacherClassesPage />
          ) : (
            "student"
          )
        }
      />
      {/* <Route path=":classId" element={} /> */}
    </Routes>
  );
}
