import styles from "./studentPageStyle.module.css";
import { Container } from "react-bootstrap";
import { getStudentList } from "../../Services/SymfonyApi/ClassHandler";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClassInfoContext } from "../ClassDetail";

export default function StudentAllMemberPage() {
  const params = useParams();
  const classId = params.classId;

  const classInfo = useContext(ClassInfoContext);

  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    getStudentList(classId, (data) => {
      setStudentList(data);
      console.log(data);
    });
  }, []);
  return <Container>Student</Container>;
}
