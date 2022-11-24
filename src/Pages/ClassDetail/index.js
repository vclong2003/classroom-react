import styles from "./style.module.css";
import {
  Badge,
  Button,
  CloseButton,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import PostItem from "./postItem";
import RichTextEditor from "../../Components/RichTextEditor";
import { getClassDetail } from "../../Services/SymfonyApi/ClassHandler";
import { readableDateTimeConvert } from "../../Components/ReadableDateTimeConverter";
import { getPosts } from "../../Services/SymfonyApi/PostHandler";

export default function ClassDetail({ role }) {
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [classInfo, setClassInfo] = useState({
    id: 0,
    name: "",
    startDate: "",
    studentCount: 0,
    teacherId: 0,
    teacherImageUrl: "",
    teacherName: "",
    teacherEmail: "",
    teacherPhoneNumber: "",
  });
  const [postData, setPostData] = useState([]);
  const [teacherInfoModalVisible, setTeacherInfoModalVisible] = useState(false);

  const fetchClassDetail = () => {
    getClassDetail(params.classId, (info) => {
      setClassInfo(info);
      // console.log(info);
      // console.log(role);
    });
  };

  const fetchPosts = () => {
    getPosts(params.classId, (data) => {
      console.log(data);
    });
  };

  useEffect(() => {
    fetchClassDetail();
    fetchPosts();
  }, []);

  return (
    <Container fluid className={styles.container}>
      <Container className={styles.classInfoContainer}>
        <Row className={styles.className}>{classInfo.name}</Row>
        <Row>
          <Col xl={1} xxl={1} className={styles.teacherImgContainer}>
            <Image
              src={
                classInfo.teacherImageUrl
                  ? classInfo.teacherImageUrl
                  : require("../../Assets/userPlaceholder.png")
              }
              roundedCircle
              fluid
              className={styles.teacherImg}
            />
          </Col>
          <Col
            xl={6}
            xxl={6}
            className={styles.teacherName}
            onClick={() => {
              setTeacherInfoModalVisible(true);
            }}
          >
            <div className={styles.teacherNameClickable}>
              {classInfo.teacherName}
            </div>
            <div style={{ width: "6px" }} />
            <Badge pill bg="info">
              Teacher
            </Badge>
          </Col>
          <Col xl={5} xxl={5} className={styles.classDetail}>
            Class ID: {classInfo.id}
            <br />
            Created: {readableDateTimeConvert(classInfo.startDate)}
            <br />
            Number of students: {classInfo.studentCount}
            <br />
          </Col>
        </Row>
      </Container>
      <Container className={styles.actionBtnContainer}>
        <Button className={styles.actionBtn}>View all members</Button>
        {role === "teacher" ? (
          <Button className={styles.actionBtn}>Take attendance</Button>
        ) : (
          ""
        )}
      </Container>
      <Container>
        {/* RENDER POST ITEMS HERE */}
        <PostItem />
        <PostItem />
        <PostItem />
      </Container>
      <Button className={styles.addPostBtn}>
        <i className="bi bi-pencil-square"></i>
      </Button>
      <TeacherInfoModal
        teacherInfo={{
          teacherEmail: classInfo.teacherEmail,
          teacherName: classInfo.teacherName,
          teacherPhoneNumber: classInfo.teacherPhoneNumber,
        }}
        visible={teacherInfoModalVisible}
        closeCallback={() => {
          setTeacherInfoModalVisible(false);
        }}
      />
    </Container>
  );
}

function TeacherInfoModal({
  teacherInfo = {
    teacherEmail: "",
    teacherName: "",
    teacherPhoneNumber: "",
  },
  visible,
  closeCallback,
}) {
  return (
    <Modal
      show={visible}
      onHide={() => {
        closeCallback();
      }}
      centered
    >
      <Modal.Body>
        <Container>
          <CloseButton
            onClick={() => {
              closeCallback();
            }}
          />
        </Container>
        <Container>
          <h5>Teacher contact infomation:</h5>
          <p>{teacherInfo.teacherName}</p>
          <p>Email: {teacherInfo.teacherEmail}</p>
          <p>Phone number: {teacherInfo.teacherPhoneNumber}</p>
        </Container>
      </Modal.Body>
    </Modal>
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
