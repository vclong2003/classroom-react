import { useState } from "react";
import { Badge, Button, Container } from "react-bootstrap";
import { readableDateTimeConvert } from "../../Components/ReadableDateTimeConverter";
import styles from "./style.module.css";

export default function PostItem({
  data = {
    content: "",
    dateAdded: "",
    isAssignment: true,
    asmId: null,
  },
  role,
}) {
  const [collapse, setCollapse] = useState(true);
  return (
    <Container className={styles.postContainer}>
      <Container className={styles.postInfoContainer}>
        {data.isAssignment && role === "student" ? (
          <div>
            {data.asmId ? (
              <Badge pill bg="success" className={styles.asmBadge}>
                Submited
              </Badge>
            ) : (
              <Badge pill bg="danger" className={styles.asmBadge}>
                Not submited
              </Badge>
            )}
          </div>
        ) : (
          ""
        )}
        {data.isAssignment && role === "teacher" ? (
          <Badge pill bg="secondary" text="light" className={styles.asmBadge}>
            Assignment
          </Badge>
        ) : (
          ""
        )}
        <div className={styles.postTime}>
          {readableDateTimeConvert(data.dateAdded)}
        </div>
      </Container>
      <Container
        className={`${styles.postContent} ${
          collapse ? styles.postContentCollapse : ""
        }`}
        fluid
        onClick={() => {
          setCollapse(false);
        }}
      >
        {data.content}
      </Container>
      <Container fluid className={styles.postActionBtnContainer}>
        {role === "teacher" ? (
          <>
            <div className={styles.postEditBtn}>
              <i className="bi bi-pencil-fill"></i>
            </div>
            <div className={styles.postEditBtn} style={{ color: "gray" }}>
              <i className="bi bi-trash2-fill"></i>
            </div>
          </>
        ) : data.isAssignment ? (
          <Button className={styles.actionBtn}>Submit assignment</Button>
        ) : (
          ""
        )}
      </Container>
    </Container>
  );
}
