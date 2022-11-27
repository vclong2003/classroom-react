import styles from "./studentPageStyle.module.css";
import { Container } from "react-bootstrap";
import { getStudentList } from "../../Services/SymfonyApi/ClassHandler";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function StudentAllMemberPage() {
  const params = useParams();
  const classId = params.classId;

  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    getStudentList(classId, (data) => {
      setStudentList(data);
      console.log(data);
    });
  }, []);
  return <Container>Student</Container>;
}
