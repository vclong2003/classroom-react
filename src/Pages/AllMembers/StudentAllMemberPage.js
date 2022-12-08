import styles from "./studentPageStyle.module.css";
import { Container, Ratio } from "react-bootstrap";
import { getStudentList } from "../../Services/SymfonyApi/ClassHandler";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClassInfoContext } from "../ClassDetail";
import LoadingSpinner from "../../Components/LoadingAnimation/Spinner";
import AvatarItem from "../../Components/Avatar";

export default function StudentAllMemberPage() {
  const params = useParams();
  const classId = params.classId;

  const classInfo = useContext(ClassInfoContext);

  const [loading, setLoading] = useState(false);
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    setLoading(true);
    getStudentList(classId, (data) => {
      setStudentList(data);
      setLoading(false);
    });
  }, []);
  return (
    <Container fluid className={styles.container}>
      <Container className={styles.sectionTitle}>Teacher</Container>
      <Container className={styles.teacherItem}>
        <div className={styles.teacherImgContainer}>
          <AvatarItem source={classInfo.teacherImageUrl} />
        </div>
        <div>
          <Container>
            <span className={styles.teacherFieldTitle}>Name: </span>
            {classInfo.teacherName}
          </Container>
          <Container>
            <span className={styles.teacherFieldTitle}>Email: </span>
            {classInfo.teacherEmail}
          </Container>
          <Container>
            <span className={styles.teacherFieldTitle}>Phone number: </span>
            {classInfo.teacherPhoneNumber}
          </Container>
        </div>
      </Container>
      <Container className={styles.sectionTitle}>Students</Container>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Container className={styles.studentItemsContainer}>
          {studentList.map((item, index) => {
            return <StudentItem data={item} key={index} />;
          })}
        </Container>
      )}
    </Container>
  );
}

function StudentItem({
  data = {
    email: "",
    imageUrl: null,
    name: "",
  },
}) {
  return (
    <Container className={styles.studentItem}>
      <Container className={styles.studentInfoContainer}>
        <div className={styles.studentImgContainer}>
          <AvatarItem source={data.imageUrl} />
        </div>
        <div className={styles.studentName}>{data.name}</div>
      </Container>
      <Container>
        <span className={styles.studentItemFieldTitle}>Email: </span>
        {data.email}
      </Container>
    </Container>
  );
}
