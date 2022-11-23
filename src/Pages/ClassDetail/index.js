import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import RichTextEditor from "../../Components/RichTextEditor";
import { useEffect, useLayoutEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import styles from "./style.module.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ListGroup from "react-bootstrap/ListGroup";
import {
  getClassDetail,
  getStudentList,
} from "../../Services/SymfonyApi/ClassHandler";

export default function ClassDetail({ role }) {
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [classInfo, setClassInfo] = useState({});
  const [studentList, setStudentList] = useState();

  useEffect(() => {
    getClassDetail(params.classId, (info) => {
      setClassInfo(info);
    });
    getStudentList(params.classId);
  }, []);

  return (
    <Container fluid className={styles.container}>
      <Container className={styles.classInfoContainer}>
        <Row>
          <h1>{classInfo.name}</h1>
        </Row>
        <Row>
          <Col xl={1} xxl={1}>
            <Image
              src={
                classInfo.teacherImgURL
                  ? classInfo.teacherImgURL
                  : require("../../Assets/userPlaceholder.jpg")
              }
              fluid
              roundedCircle
            />
          </Col>
          <Col xl={11} xxl={11}>
            {classInfo.teacherName}
          </Col>
        </Row>
      </Container>
      <Tabs
        defaultActiveKey="stream"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="stream" title="Stream">
          <PostAdder />
          <Container>
            {/* RENDER POST ITEMS HERE */}
            <PostItem />
          </Container>
        </Tab>
        <Tab eventKey="people" title="People">
          <Container>
            <Button>Add</Button>
          </Container>
          <Container>
            <Container fluid>
              <h3>Teacher</h3>
            </Container>
            <Container>
              <Row>
                <Col xl={1} xxl={1}>
                  <Image
                    src={
                      classInfo.teacherImgURL
                        ? classInfo.teacherImgURL
                        : require("../../Assets/userPlaceholder.jpg")
                    }
                    fluid
                    roundedCircle
                  />
                </Col>
                <Col xl={11} xxl={11}>
                  Vu Cong Long
                </Col>
              </Row>
            </Container>
          </Container>
          <Container>
            <Container fluid>
              <h3>Student</h3>
            </Container>
            <ListGroup variant="flush">
              {/* RENDER STUDENTS HERE */}
              <StudentItem />
              <StudentItem />
            </ListGroup>
          </Container>
        </Tab>
      </Tabs>
    </Container>
  );
}

function StudentItem() {
  const [isAttend, setIsAttend] = useState(false);
  return (
    <ListGroup.Item>
      <Row>
        <Col xl={1} xxl={1}>
          <Image
            src={require("../../Assets/userPlaceholder.jpg")}
            fluid
            roundedCircle
          />
        </Col>
        <Col xl={8} xxl={8}>
          Vu Cong Long
        </Col>
        <Col xl={3} xxl={3}>
          <Row>
            <Col xl={4} xxl={4} style={{ color: isAttend ? "gray" : "red" }}>
              Absent
            </Col>
            <Col xl={4} xxl={4}>
              <Form.Check
                type="switch"
                onChange={(evt) => {
                  setIsAttend(evt.target.checked);
                }}
              />
            </Col>
            <Col xl={4} xxl={4} style={{ color: isAttend ? "green" : "gray" }}>
              Attended
            </Col>
          </Row>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

function PostItem() {
  const [collapse, setCollapse] = useState(true);
  return (
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
          incididunt aute ut adipisicing irure aute laborum elit nisi aute Lorem
          amet. Consectetur fugiat eu et ad dolor aliqua commodo nostrud
          proident. Ullamco laborum culpa ut aute eu esse exercitation commodo
          qui eiusmod aute. Laboris culpa laboris est ullamco. Mollit proident
          sit aliquip proident cupidatat. Mollit proident sit aliquip proident
          cupidatat. Esse sint laborum incididunt aute ut adipisicing irure aute
          laborum elit nisi aute Lorem amet. Consectetur fugiat eu et ad dolor
          aliqua commodo nostrud proident. Ullamco laborum culpa ut aute eu esse
          exercitation commodo qui eiusmod aute. Laboris culpa laboris est
          ullamco. Mollit proident sit aliquip proident cupidatat.
        </Container>
      </Card.Body>
      <Container fluid>
        <Form.Control />
        <Button>Send</Button>
      </Container>
    </Card>
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

function LoadingSpinner() {
  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "60px",
        marginBottom: "60px",
      }}
    >
      <Spinner animation="border" />
    </Container>
  );
}
