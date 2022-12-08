import styles from "./teacherPageStyle.module.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  getAllAsm,
  setAsmMark,
} from "../../Services/SymfonyApi/AssignmentHandler";
import { useParams } from "react-router-dom";
import { getFileName } from "../../Services/Firebase";
import { readableDateTimeConvert } from "../../Components/ReadableDateTimeConverter";
import LoadingSpinner from "../../Components/LoadingAnimation/Spinner";
import AvatarItem from "../../Components/Avatar";

export default function TeacherAsmPage() {
  const params = useParams();
  const classId = params.classId;
  const postId = params.postId;

  const [loading, setLoading] = useState(false);
  const [asmList, setAsmList] = useState([]);

  useEffect(() => {
    setLoading(true);
    getAllAsm(classId, postId, (data) => {
      setAsmList(data);
      setLoading(false);
    });
  }, []);

  return (
    <Container fluid className={styles.container}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Container className={styles.asmContainer}>
          {/* RENDER ASM LIST HERE */}
          {asmList.map((item, index) => {
            return (
              <AsmItem
                data={item}
                classId={classId}
                postId={postId}
                key={index}
              />
            );
          })}
        </Container>
      )}
    </Container>
  );
}

function AsmItem({
  data = {
    dateAdded: "",
    fileUrl: "",
    id: 0,
    mark: null,
    postId: 0,
    userImageUrl: "",
    userName: "",
  },
  classId,
  postId,
}) {
  const [fileName, setFileName] = useState();
  const [mark, setMark] = useState(data.mark);
  const [markInput, setMarkInput] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSetMarkBtn = () => {
    if (markInput) {
      setLoading(true);
      setAsmMark(classId, postId, data.id, markInput, () => {
        setMark(markInput);
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    getFileName(data.fileUrl, (name) => {
      setFileName(name);
    });
  }, []);

  return (
    <Container className={styles.asmItem}>
      <Row className={styles.studentInfoContainer}>
        <Col xl={2} xxl={2}>
          <AvatarItem source={data.userImageUrl} />
        </Col>
        <Col xl={10} xxl={10} className={styles.studentName}>
          <div>{data.userName}</div>
        </Col>
      </Row>
      <Container>
        <span className={styles.asmFieldTitle}>Submited:</span>{" "}
        {readableDateTimeConvert(data.dateAdded)}
      </Container>
      <Container>
        <div className={styles.asmFileLink}>
          <span className={styles.asmFieldTitle}>File:</span>{" "}
          <a href={data.fileUrl} title={fileName}>
            {fileName}
          </a>
        </div>
      </Container>
      <Container className={styles.asmItemMark}>
        <span className={styles.asmFieldTitle}>Mark:</span>{" "}
        {mark ? mark : "not set"}
      </Container>
      <Container className={styles.setMarkForm}>
        <Form.Control
          type="number"
          className={styles.markInput}
          onChange={(evt) => {
            setMarkInput(evt.target.value);
          }}
        />
        <Button
          className={styles.setMarkBtn}
          onClick={handleSetMarkBtn}
          disabled={loading}
        >
          {loading ? "Setting..." : "Set mark"}
        </Button>
      </Container>
    </Container>
  );
}
