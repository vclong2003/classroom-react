import styles from "./style.module.css";
import Card from "react-bootstrap/Card";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import { useEffect, useState } from "react";
import { getRole } from "../../Services/SymfonyApi/UserHandler";
import { getClassroom } from "../../Services/SymfonyApi/ClassHandler";

export default function Classes() {
  const [role, setRole] = useState("student");
  const [classroomList, setClassroomList] = useState([]);

  useEffect(() => {
    getRole((role) => {
      setRole(role);
    });
    fetchClassroomList();
  }, []);

  function fetchClassroomList() {
    getClassroom((data) => {
      setClassroomList(data);
    });
  }

  return (
    <Container>
      {role === "teacher" ? (
        <Container>
          <Button>Add</Button>
        </Container>
      ) : (
        ""
      )}
      <Row>
        {/* RENDER CLASSROOM ITEMS HERE */}
      </Row>
    </Container>
  );
}