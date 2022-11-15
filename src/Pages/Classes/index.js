import styles from "./style.module.css";
import Card from "react-bootstrap/Card";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";

export default function Classes() {
  return (
    <Container>
      <Row>
        <Col xl={4} xxl={4}>
          <Card bg="light">
            <Card.Header>
              WEBG301{" "}
              <Badge pill bg="warning" text="dark">
                <i className="bi bi-bell"></i>
              </Badge>
            </Card.Header>
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
      </Row>
    </Container>
  );
}
