import styles from "./style.module.css";
import { useContext, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Container,
  Form,
  Modal,
  Nav,
  Ratio,
  Tab,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { RoleContext } from "../..";
import AvatarItem from "../../Components/Avatar";
import { getStudentList } from "../../Services/SymfonyApi/ClassHandler";
import LoadingSpinner from "../../Components/LoadingAnimation/Spinner";
import {
  addAttendanceRecord,
  getAttendanceGroup,
  getAttendances,
} from "../../Services/SymfonyApi/AttendanceHandler";
import { readableDateTimeConvert } from "../../Components/ReadableDateTimeConverter";

export default function AttendancePage() {
  const navigate = useNavigate();
  const params = useParams();
  const classId = params.classId;
  const role = useContext(RoleContext);

  const [activeTab, setActiveTab] = useState("takeAttendance");

  const [loadingStudentList, setLoadingStudentList] = useState(false);
  const [attendanceData, setAttendanceData] = useState();
  const [studentList, setStudentList] = useState([]);
  const fetchStudentList = () => {
    setLoadingStudentList(true);
    getStudentList(classId, (data) => {
      setStudentList(data);

      //build data schema
      const tempSchema = {};
      data.map((item) => {
        tempSchema[item.userId] = false;
      });
      setAttendanceData(tempSchema);

      setLoadingStudentList(false);
    });
  };

  const [savingAttendance, setSavingAttendance] = useState(false);
  const handleAddAttendanceBtn = () => {
    setSavingAttendance(true);
    addAttendanceRecord(classId, attendanceData, () => {
      setSavingAttendance(false);
    });
  };

  const [attendanceResultModalVisible, setAttendanceResultModalVisible] =
    useState(false);
  const [attendanceGroupList, setAttendanceGroupList] = useState([]);
  const [attendanceResultList, setAttendanceResultList] = useState([]);
  const fetchAttendanceGroupList = () => {
    getAttendanceGroup(classId, (data) => {
      setAttendanceGroupList(data);
    });
  };

  function AttendanceGroupItem({
    data = { classId: 18, id: 22, time: "2022-11-30 17:37:31" },
  }) {
    const [loadingResults, setLoadingResults] = useState(false);
    const handleViewBtn = () => {
      setLoadingResults(true);
      getAttendances(data.classId, data.id, (result) => {
        setAttendanceResultList(result);
        setAttendanceResultModalVisible(true);
        setLoadingResults(false);
      });
    };

    return (
      <Container className={styles.attendanceGroupItem}>
        <div>
          <strong>
            <i>Time:</i>
          </strong>{" "}
          {readableDateTimeConvert(data.time)}
        </div>
        <Button
          className={styles.btn}
          onClick={handleViewBtn}
          disabled={loadingResults}
        >
          {loadingResults ? "Loading..." : "View"}
        </Button>
      </Container>
    );
  }

  function StudentItem({
    studentData = {
      imageUrl: "",
      name: "Test user 2",
      userId: 32,
      isAttend: false,
    },
    edit = false,
  }) {
    function EditComponents({ children }) {
      if (edit) {
        return children;
      }
    }

    function ViewComponents({ children }) {
      if (!edit) {
        return children;
      }
    }

    return (
      <Container className={styles.studentItem}>
        <div className={styles.studentAvatarContainer}>
          <Ratio aspectRatio="1x1">
            <AvatarItem source={studentData.imageUrl} />
          </Ratio>
        </div>
        <div className={styles.studentName}>{studentData.name}</div>
        <div className={styles.attendanceContainer}>
          <EditComponents>
            {attendanceData[studentData.userId] ? (
              <Badge pill bg="success" className={styles.isAttendBadge}>
                Attend
              </Badge>
            ) : (
              <Badge pill bg="danger" className={styles.isAttendBadge}>
                Absent
              </Badge>
            )}
            <Form.Check
              type="switch"
              checked={attendanceData[studentData.userId]}
              onChange={(evt) => {
                setAttendanceData({
                  ...attendanceData,
                  [studentData.userId]: evt.target.checked,
                });
              }}
            />
          </EditComponents>
          <ViewComponents>
            {studentData.isAttend ? (
              <Badge pill bg="success" className={styles.isAttendBadge}>
                Attend
              </Badge>
            ) : (
              <Badge pill bg="danger" className={styles.isAttendBadge}>
                Absent
              </Badge>
            )}
          </ViewComponents>
        </div>
      </Container>
    );
  }

  useEffect(() => {
    fetchStudentList();
  }, []);
  useEffect(() => {
    if (activeTab === "viewAttendance") {
      fetchAttendanceGroupList();
    }
  }, [activeTab]);

  if (role === "teacher") {
    return (
      <Container fluid className={styles.container}>
        <Tab.Container
          activeKey={activeTab}
          onSelect={(key) => setActiveTab(key)}
        >
          <Container>
            <Nav>
              <Nav.Item>
                <Nav.Link
                  eventKey="takeAttendance"
                  className={styles.tabSwitchBtn}
                >
                  Take attendance
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="viewAttendance"
                  className={styles.tabSwitchBtn}
                >
                  View attendance
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Container>
          <Tab.Content>
            <Tab.Pane eventKey="takeAttendance">
              {loadingStudentList ? (
                <LoadingSpinner />
              ) : (
                <>
                  <Container className={styles.studentItemContainer}>
                    {studentList.map((item, index) => {
                      return (
                        <StudentItem
                          studentData={item}
                          key={index}
                          edit={true}
                        />
                      );
                    })}
                  </Container>
                  <Container>
                    <Button
                      className={styles.btn}
                      onClick={handleAddAttendanceBtn}
                      disabled={savingAttendance}
                    >
                      {savingAttendance ? "Adding..." : "Add record"}
                    </Button>
                  </Container>
                </>
              )}
            </Tab.Pane>
            <Tab.Pane eventKey="viewAttendance">
              <Container>
                {attendanceGroupList.map((item, index) => {
                  return <AttendanceGroupItem data={item} key={index} />;
                })}
              </Container>
              <Modal
                show={attendanceResultModalVisible}
                onHide={() => {
                  setAttendanceResultModalVisible(false);
                }}
                size="lg"
              >
                <Modal.Body className={styles.attendanceResultModal}>
                  {attendanceResultList.map((item, index) => {
                    return <StudentItem studentData={item} key={index} />;
                  })}
                </Modal.Body>
              </Modal>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    );
  } else {
    setTimeout(() => {
      navigate("/");
    }, 2000);
    return <h4>You're not allowed to view this page!</h4>;
  }
}
