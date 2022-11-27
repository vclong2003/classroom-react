import styles from "./teacherPageStyle.module.css";
import { Accordion, Button, Container, Image, Ratio } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getStudentList,
  unjoinClass,
} from "../../Services/SymfonyApi/ClassHandler";
import LoadingSpinner from "../../Components/LoadingAnimation/Spinner";
import ConfirmationPopup from "../../Components/ComfirmationPopup";

export default function TeacherAllMemberPage() {
  const params = useParams();
  const classId = params.classId;

  const [loading, setLoading] = useState(false);

  const [studentList, setStudentList] = useState([]);
  const fetchStudentList = () => {
    setLoading(true);
    getStudentList(classId, (data) => {
      setStudentList(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchStudentList();
  }, []);

  return (
    <Container className={styles.container} fluid>
      <Container>
        <Container className={styles.sectionTitle}>Student List</Container>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Accordion>
            {studentList.map((item, index) => {
              return <StudentItem data={item} key={index} classId={classId} />;
            })}
          </Accordion>
        )}
      </Container>
    </Container>
  );
}

function StudentItem({
  data = {
    address: null,
    dob: null,
    email: "",
    id: 20,
    imageUrl: null,
    name: "",
    phoneNumber: null,
    userId: 32,
  },
  classId,
}) {
  const [confirmPopupVisible, setConfirmPopupVisible] = useState(false);
  const handleRemoveStudent = () => {
    unjoinClass(classId, data.userId, () => {
      console.log("removed");
    });
  };

  return (
    <Accordion.Item eventKey={data.id}>
      <Accordion.Header className={styles.studentItemHeader}>
        <div className={styles.studentImgContainer}>
          <Ratio aspectRatio="1x1">
            <Image
              src={
                data.imageUrl
                  ? data.imageUrl
                  : require("../../Assets/userPlaceholder.png")
              }
              fluid
              roundedCircle
            />
          </Ratio>
        </div>
        <div className={styles.studentName}>{data.name}</div>
      </Accordion.Header>
      <Accordion.Body>
        <Container>
          <span className={styles.studentItemFieldTitle}>Email:</span>{" "}
          {data.email}
        </Container>
        <Container>
          <span className={styles.studentItemFieldTitle}>Phone number:</span>{" "}
          {data.phoneNumber ? data.phoneNumber : "not set"}
        </Container>
        <Container>
          <span className={styles.studentItemFieldTitle}>Date of Birth:</span>{" "}
          {data.dob ? data.dob : "not set"}
        </Container>
        <Container>
          <span className={styles.studentItemFieldTitle}>Address:</span>{" "}
          {data.address ? data.address : "not set"}
        </Container>
        <Container>
          <Button
            className={styles.studentItemActionBtn}
            onClick={() => {
              setConfirmPopupVisible(true);
            }}
          >
            Remove
          </Button>
        </Container>
      </Accordion.Body>
      <ConfirmationPopup
        message="Delete this student?"
        visible={confirmPopupVisible}
        handleClose={() => {
          setConfirmPopupVisible(false);
        }}
        handleConfirm={() => {
          handleRemoveStudent();
          setConfirmPopupVisible(false);
        }}
      />
    </Accordion.Item>
  );
}
