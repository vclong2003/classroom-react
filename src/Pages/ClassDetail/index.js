import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import RichTextEditor from "../../Components/RichTextEditor";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import styles from "./style.module.css";

export default function ClassDetail() {
  const params = useParams();

  const [collapse, setCollapse] = useState(true);

  return (
    <Container>
      <PostAdder />
      <Container>
        {/* RENDER POST HERE */}
        <Card>
          <Card.Body
            onClick={() => {
              setCollapse(false);
            }}
          >
            <Container
              className={`${styles.commentBody} ${
                collapse ? styles.commentBodyCollapse : ""
              }`}
              fluid
            >
              Mollit proident sit aliquip proident cupidatat. Esse sint laborum
              incididunt aute ut adipisicing irure aute laborum elit nisi aute
              Lorem amet. Consectetur fugiat eu et ad dolor aliqua commodo
              nostrud proident. Ullamco laborum culpa ut aute eu esse
              exercitation commodo qui eiusmod aute. Laboris culpa laboris est
              ullamco. Mollit proident sit aliquip proident cupidatat. Mollit
              proident sit aliquip proident cupidatat. Esse sint laborum
              incididunt aute ut adipisicing irure aute laborum elit nisi aute
              Lorem amet. Consectetur fugiat eu et ad dolor aliqua commodo
              nostrud proident. Ullamco laborum culpa ut aute eu esse
              exercitation commodo qui eiusmod aute. Laboris culpa laboris est
              ullamco. Mollit proident sit aliquip proident cupidatat.
            </Container>
          </Card.Body>
          <Container fluid>
            <Form.Control />
            <Button>Send</Button>
          </Container>
          <Container fluid>
            {/* RENDER COMMENTS HERE */}
            <Card>
              <Card.Body>This is some text within a card body.</Card.Body>
            </Card>
            <Card>
              <Card.Body>This is some text within a card body.</Card.Body>
            </Card>
          </Container>
        </Card>
      </Container>
      {/* {params.classId} */}
    </Container>
  );
}

function PostAdder() {
  const [postContent, setPostContent] = useState("");

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <Row>
            <Col xl={1} xxl={1}>
              <Image
                src={require("../../Assets/userPlaceholder.jpg")}
                fluid
                roundedCircle
              />
            </Col>
            <Col xl={11} xxl={11}>
              Post something to your class
            </Col>
          </Row>
        </Accordion.Header>
        <Accordion.Body>
          <RichTextEditor
            onChangeCallback={(value) => {
              setPostContent(value);
            }}
          />
          <Container>
            <Button>Save</Button>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
