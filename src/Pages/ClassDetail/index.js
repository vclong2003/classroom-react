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
} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import PostItem from "./postItem";
import { getClassDetail } from "../../Services/SymfonyApi/ClassHandler";
import { readableDateTimeConvert } from "../../Components/ReadableDateTimeConverter";
import { getPosts } from "../../Services/SymfonyApi/PostHandler";
import { RoleContext } from "../..";
import LoadingSpinner from "../../Components/LoadingAnimation/Spinner";
import PostWriterPage from "../PostWriter";
import AssignmentPage from "../Assignment";
import AllMemberPage from "../AllMembers";

export default function ClassDetail() {
  const role = useContext(RoleContext);
  function ProtectedContent({ children }) {
    if (role === "teacher") {
      return children;
    }
  }
  function ExcludeContent({ children }) {
    if (role !== "teacher") {
      return children;
    }
  }

  const params = useParams();
  const navigate = useNavigate();

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
  const [postList, setPostList] = useState([]);

  const [teacherInfoModalVisible, setTeacherInfoModalVisible] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  const fetchClassDetail = () => {
    setPageLoading(true);
    getClassDetail(params.classId, (info) => {
      setClassInfo(info);
      setPageLoading(false);
    });
  };

  const fetchPosts = () => {
    setPostLoading(true);
    getPosts(params.classId, (data) => {
      setPostList(data);
      setPostLoading(false);
    });
  };

  useEffect(() => {
    fetchClassDetail();
    fetchPosts();
  }, []);

  return (
    <Routes>
      <Route
        path=""
        element={
          pageLoading ? (
            <LoadingSpinner />
          ) : (
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
                <Button
                  className={styles.actionBtn}
                  onClick={() => {
                    navigate("allMember");
                  }}
                >
                  View all members
                </Button>
                <ProtectedContent>
                  <Button className={styles.actionBtn}>Take attendance</Button>
                </ProtectedContent>
              </Container>
              {postLoading ? (
                <LoadingSpinner />
              ) : (
                <Container>
                  {/* RENDER POST ITEMS HERE */}
                  {postList.map((item, index) => {
                    return <PostItem data={item} key={index} />;
                  })}
                </Container>
              )}
              <ProtectedContent>
                <Button
                  className={styles.addPostBtn}
                  onClick={() => {
                    navigate("post/add");
                  }}
                >
                  <i className="bi bi-pencil-square"></i>
                </Button>
              </ProtectedContent>
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
          )
        }
      />
      <Route path="allMember" element={<AllMemberPage />} />
      <Route path="post/add" element={<PostWriterPage />} />
      <Route path="post/:postId/edit" element={<PostWriterPage />} />
      <Route path="post/:postId/assignment" element={<AssignmentPage />} />
    </Routes>
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
      <Modal.Body style={{ paddingBottom: "18px", paddingTop: "18px" }}>
        <Container className={styles.teacherInfoModalBtnContainer}>
          <CloseButton
            onClick={() => {
              closeCallback();
            }}
          />
        </Container>
        <Container className={styles.teacherInfoModalContent}>
          <h5>Teacher contact infomation:</h5>
          {teacherInfo.teacherName}
          <br />
          Email: {teacherInfo.teacherEmail}
          <br />
          Phone number: {teacherInfo.teacherPhoneNumber}
        </Container>
      </Modal.Body>
    </Modal>
  );
}
