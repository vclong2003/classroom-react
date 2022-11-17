import styles from "./style.module.css";
import Card from "react-bootstrap/Card";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";

export default function ClassroomItem({ classroom }) {
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
          <Button>Open</Button>
        </Card.Footer>
      </Card>
    </Col>
  );
}
