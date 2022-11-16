import styles from "./style.module.css";
import Card from "react-bootstrap/Card";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";

export default function ClassroomItem({ classroom }) {
  return (
    <Col xl={4} xxl={4}>
      <Card bg="light">
        <Card.Header>WEBG301</Card.Header>
        <Card.Body>
          <Row>
            <Col xl={3} xxl={3}>
              <Image
                src={require("../../Assets/userPlaceholder.jpg")}
                roundedCircle
                fluid
              />
            </Col>
            <Col xl={8} xxl={9}>
              Nguyễn Đình Trần Long
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
