import {
  Badge,
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
import { getClassDetail } from "../../Services/SymfonyApi/ClassHandler";

export default function ClassDetail({ role }) {
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [classInfo, setClassInfo] = useState({
    id: 0,
    name: "",
    startDate: "",
    studentCount: 0,
    teacherId: 0,
    teacherImgURL: "",
    teacherName: "",
  });

  useEffect(() => {
    getClassDetail(params.classId, (info) => {
      setClassInfo(info);
      console.log(info);
    });
  }, []);

  return (
    <Container fluid className={styles.container}>
      <Container className={styles.classInfoContainer}>
        <Row className={styles.className}>{classInfo.name}</Row>
        <Row>
          <Col xl={1} xxl={1} className={styles.teacherImgContainer}>
            <Image
              src={
                classInfo.teacherImgURL
                  ? classInfo.teacherImgURL
                  : require("../../Assets/userPlaceholder.png")
              }
              roundedCircle
              fluid
              className={styles.teacherImg}
            />
          </Col>
          <Col xl={6} xxl={6} className={styles.teacherName}>
            {classInfo.teacherName}
            <div style={{ width: "6px" }} />
            <Badge pill bg="info">
              Teacher
            </Badge>
          </Col>
          <Col xl={5} xxl={5} className={styles.classDetail}>
            Class ID: {classInfo.id}
            <br />
            Created: {calcReadableDateTime(classInfo.startDate)}
            <br />
            Number of students: {classInfo.studentCount}
            <br />
          </Col>
        </Row>
      </Container>
      <Container className={styles.actionBtnContainer}>
        <Button className={styles.actionBtn}>View all members</Button>
        <Button className={styles.actionBtn}>Take attendance</Button>
      </Container>
      <Container>
        {/* RENDER POST ITEMS HERE */}
        <PostItem />
      </Container>
    </Container>
  );
}

function calcReadableDateTime(stringDateTime) {
  const dateObj = new Date(Date.parse(stringDateTime));
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
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
