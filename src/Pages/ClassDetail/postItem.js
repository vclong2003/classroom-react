import { useContext, useState } from "react";
import { Badge, Button, Container } from "react-bootstrap";
import { RoleContext } from "../..";
import { readableDateTimeConvert } from "../../Components/ReadableDateTimeConverter";
import styles from "./style.module.css";

export default function PostItem({
  data = {
    content: "",
    dateAdded: "",
    isAssignment: true,
    asmId: null,
  },
}) {
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

  const [collapse, setCollapse] = useState(true);
  return (
    <Container className={styles.postContainer}>
      <Container className={styles.postInfoContainer}>
        <ExcludeContent>
          {data.isAssignment ? (
            data.asmId ? (
              <Badge pill bg="success" className={styles.asmBadge}>
                Submited
              </Badge>
            ) : (
              <Badge pill bg="danger" className={styles.asmBadge}>
                Not submited
              </Badge>
            )
          ) : (
            ""
          )}
        </ExcludeContent>
        <ProtectedContent>
          {data.isAssignment ? (
            <Badge pill bg="secondary" text="light" className={styles.asmBadge}>
              Assignment
            </Badge>
          ) : (
            ""
          )}
        </ProtectedContent>
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
        <ProtectedContent>
          <div className={styles.postEditBtn}>
            <i className="bi bi-pencil-fill"></i> Edit
          </div>
          <div className={styles.postEditBtn} style={{ color: "gray" }}>
            <i className="bi bi-trash2-fill"></i> Delete
          </div>
        </ProtectedContent>
        <ExcludeContent>
          {data.isAssignment ? (
            <Button className={styles.actionBtn}>Submit assignment</Button>
          ) : (
            ""
          )}
        </ExcludeContent>
      </Container>
    </Container>
  );
}
