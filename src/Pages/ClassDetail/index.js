import styles from "./style.module.css";
import {
  Badge,
  Button,
  CloseButton,
  Col,
  Container,
  Dropdown,
  Form,
  Image,
  Modal,
  Row,
} from "react-bootstrap";

import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from "react";

import PostItem from "./postItem";
import {
  getClassDetail,
  removeClassroom,
  unjoinClass,
  updateClassroom,
} from "../../Services/SymfonyApi/ClassHandler";
import { readableDateTimeConvert } from "../../Components/ReadableDateTimeConverter";
import { getPosts } from "../../Services/SymfonyApi/PostHandler";
import { RoleContext } from "../..";
import LoadingSpinner from "../../Components/LoadingAnimation/Spinner";
import PostWriterPage from "../PostWriter";
import AssignmentPage from "../Assignment";
import AllMemberPage from "../AllMembers";
import AttendancePage from "../Attendance";
import AvatarItem from "../../Components/Avatar";
import ConfirmationPopup from "../../Components/ComfirmationPopup";

export const ClassInfoContext = createContext();

export default function ClassDetail({ classListRefresher }) {
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
  const classId = params.classId;
  const navigate = useNavigate();

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
  const [removePopupVisible, setRemovePopupVisible] = useState(false);
  const [updatePopupVisible, setUpdatePopupVisible] = useState(false);
  const [classDetailLoading, setClassDetailLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  const fetchClassDetail = () => {
    setClassDetailLoading(true);
    getClassDetail(classId, (info) => {
      setClassInfo(info);
      setClassDetailLoading(false);
    });
  };

  const fetchPosts = () => {
    setPostLoading(true);
    getPosts(classId, (data) => {
      setPostList(data);
      setPostLoading(false);
    });
  };

  const handleViewAllMemberBtn = () => {
    navigate("allMember");
  };
  const handleExitClass = () => {
    unjoinClass(classId, null, () => {
      navigate(-1);
      classListRefresher();
    });
  };
  const handleAttendanceBtn = () => {
    navigate("attendance");
  };
  const handleAddPostBtn = () => {
    navigate("post/add");
  };
  const handleRemoveClass = () => {
    removeClassroom(classId, () => {
      classListRefresher();
      navigate(-1);
    });
  };

  const customDropdownTriggerBtn = forwardRef(({ children, onClick }, ref) => {
    return (
      <div
        className={styles.customDropdownTriggerBtn}
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
      </div>
    );
  });

  function UpdateClassInfoPopup() {
    const [name, setName] = useState(classInfo.name);

    const handleSave = () => {
      updateClassroom(classId, name, () => {
        setUpdatePopupVisible(false);
        fetchClassDetail();
        classListRefresher();
      });
    };
    const handleCancle = () => {
      setUpdatePopupVisible(false);
    };

    return (
      <Modal show={updatePopupVisible} onHide={handleCancle}>
        <Modal.Body className={styles.updatePopup}>
          <Form.Control
            type="text"
            value={name}
            onChange={(evt) => {
              setName(evt.target.value);
            }}
            className={styles.updatePopupInput}
          />
          <div>
            <Button className={styles.updatePopupBtn} onClick={handleSave}>
              Save
            </Button>
            <Button className={styles.updatePopupBtn} onClick={handleCancle}>
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  useEffect(() => {
    fetchClassDetail();
    fetchPosts();
  }, []);

  return (
    <ClassInfoContext.Provider value={classInfo}>
      <Routes>
        <Route
          path=""
          element={
            <Container fluid className={styles.container}>
              <Container className={styles.header}>
                <div className={styles.className}>{classInfo.name}</div>

                <ProtectedContent>
                  <Dropdown>
                    <Dropdown.Toggle as={customDropdownTriggerBtn}>
                      <i className="bi bi-three-dots-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          setUpdatePopupVisible(true);
                        }}
                      >
                        Rename
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setRemovePopupVisible(true);
                        }}
                      >
                        Remove this class
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <ConfirmationPopup
                    visible={removePopupVisible}
                    message="Do you really want to remove this class?"
                    handleClose={() => {
                      setRemovePopupVisible(false);
                    }}
                    handleConfirm={handleRemoveClass}
                  />
                  <UpdateClassInfoPopup />
                </ProtectedContent>
              </Container>
              {classDetailLoading ? (
                <LoadingSpinner />
              ) : (
                <Container className={styles.classInfoContainer}>
                  <Row>
                    <Col xl={1} xxl={1} className={styles.teacherImgContainer}>
                      <AvatarItem source={classInfo.teacherImageUrl} />
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
              )}
              <Container className={styles.actionBtnContainer}>
                <Button
                  className={styles.actionBtn}
                  onClick={handleViewAllMemberBtn}
                >
                  View all members
                </Button>
                <ExcludeContent>
                  <Button
                    className={styles.actionBtn}
                    onClick={handleExitClass}
                  >
                    Exit class <i className="bi bi-box-arrow-right"></i>
                  </Button>
                </ExcludeContent>
                <ProtectedContent>
                  <Button
                    className={styles.actionBtn}
                    onClick={handleAttendanceBtn}
                  >
                    Attendance
                  </Button>
                </ProtectedContent>
              </Container>
              {postLoading ? (
                <LoadingSpinner />
              ) : (
                <Container>
                  {/* RENDER POST ITEMS HERE */}
                  {postList.map((item, index) => {
                    return (
                      <PostItem
                        data={item}
                        postsRefresher={fetchPosts}
                        key={index}
                      />
                    );
                  })}
                </Container>
              )}
              <ProtectedContent>
                <Button
                  className={styles.addPostBtn}
                  onClick={handleAddPostBtn}
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
          }
        />
        <Route path="allMember" element={<AllMemberPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route
          path="post/add"
          element={<PostWriterPage postsRefresher={fetchPosts} />}
        />
        <Route
          path="post/:postId/edit"
          element={<PostWriterPage postsRefresher={fetchPosts} />}
        />
        <Route
          path="post/:postId/assignment"
          element={<AssignmentPage postsRefresher={fetchPosts} />}
        />
      </Routes>
    </ClassInfoContext.Provider>
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
