import styles from "./style.module.css";
import { useContext, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Container,
  Form,
  Nav,
  Ratio,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { RoleContext } from "../..";
import AvatarItem from "../../Components/Avatar";
import { getStudentList } from "../../Services/SymfonyApi/ClassHandler";

export default function AttendancePage() {
  const navigate = useNavigate();
  const params = useParams();
  const classId = params.classId;
  const role = useContext(RoleContext);

  const [studentList, setStudentList] = useState([]);
  const fetchStudentList = () => {
    getStudentList(classId, (data) => {
      setStudentList(data);
    });
  };

  useEffect(() => {
    fetchStudentList();
  }, []);

  function StudentItem({
    studentData = {
      imageUrl: "",
      name: "Test user 2",
      userId: 32,
    },
  }) {
    return (
      <Container className={styles.studentItem}>
        <div className={styles.studentAvatarContainer}>
          <Ratio aspectRatio="1x1">
            <AvatarItem source={studentData.imageUrl} />
          </Ratio>
        </div>
        <div className={styles.studentName}>{studentData.name}</div>
        <div className={styles.attendanceContainer}>
          <Badge pill bg="danger" className={styles.isAttendBadge}>
            Absent
          </Badge>
          <Form.Check type="switch" />
        </div>
      </Container>
    );
  }

  if (role === "teacher") {
    return (
      <Container fluid className={styles.container}>
        <Tab.Container defaultActiveKey="takeAttendance">
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
              <Container className={styles.studentItemContainer}>
                {studentList.map((item, index) => {
                  return <StudentItem studentData={item} key={index} />;
                })}
              </Container>
              <Container>
                <Button className={styles.btn}>Add record</Button>
              </Container>
            </Tab.Pane>
            <Tab.Pane eventKey="viewAttendance">
              <Container>
                Aliquip tempor est minim ad excepteur occaecat Lorem officia do.
                Laboris pariatur sunt culpa aute nostrud qui in ipsum id duis
                aliqua et sint enim. Veniam cupidatat in laborum ad culpa ex ex
                et incididunt exercitation eiusmod pariatur irure est. Excepteur
                aliqua in labore consequat officia proident esse velit ea.
                Aliquip tempor est minim ad excepteur occaecat Lorem officia do.
                Laboris pariatur sunt culpa aute nostrud qui in ipsum id duis
                aliqua et sint enim. Veniam cupidatat in laborum ad culpa ex ex
                et incididunt exercitation eiusmod pariatur irure est. Excepteur
                aliqua in labore consequat officia proident esse velit ea.
              </Container>
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
