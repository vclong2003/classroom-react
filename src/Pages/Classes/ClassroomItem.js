import styles from "./style.module.css";
import Card from "react-bootstrap/Card";
import { Button, Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addStudent } from "../../Services/SymfonyApi/ClassHandler";

export default function ClassroomItem({ classroom, role, addStudentCallback }) {
  const navigate = useNavigate();

  function AuthorizedBtn() {
    if (role === "teacher" || classroom.isJoined) {
      return (
        <Button
          onClick={() => {
            navigate(`${classroom.id}`);
          }}
        >
          Open
        </Button>
      );
    } else {
      return (
        <Button
          onClick={() => {
            addStudent(classroom.id, () => {
              addStudentCallback();
            });
          }}
        >
          Join
        </Button>
      );
    }
  }

  return (
    <Col xl={4} xxl={4}>
      <Card bg="light">
        <Card.Header>{classroom.name}</Card.Header>
        <Card.Body>
          <Row>
            <Col xl={3} xxl={3}>
              <Image
                src={
                  classroom.teacherImageUrl
                    ? classroom.teacherImageUrl
                    : require("../../Assets/userPlaceholder.jpg")
                }
                roundedCircle
                fluid
              />
            </Col>
            <Col xl={8} xxl={9}>
              {classroom.teacherName}
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          {/* BTN HERE */}
          <AuthorizedBtn />
        </Card.Footer>
      </Card>
    </Col>
  );
}
