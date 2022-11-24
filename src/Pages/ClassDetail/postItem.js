import { useState } from "react";
import { Badge, Button, Card, Container } from "react-bootstrap";
import styles from "./style.module.css";

export default function PostItem() {
  const [collapse, setCollapse] = useState(true);
  return (
    <Container className={styles.postContainer}>
      <Container className={styles.postInfoContainer}>
        <Badge pill bg="danger" className={styles.assignmentWarning}>
          Assignment
        </Badge>
        <div className={styles.postTime}>November 23, 2022 at 11:08 PM</div>
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
        Mollit proident sit aliquip proident cupidatat. Esse sint laborum
        incididunt aute ut adipisicing irure aute laborum elit nisi aute Lorem
        amet. Consectetur fugiat eu et ad dolor aliqua commodo nostrud proident.
        Ullamco laborum culpa ut aute eu esse exercitation commodo qui eiusmod
        aute. Laboris culpa laboris est ullamco. Mollit proident sit aliquip
        proident cupidatat. Mollit proident sit aliquip proident cupidatat. Esse
        sint laborum incididunt aute ut adipisicing irure aute laborum elit nisi
        aute Lorem amet. Consectetur fugiat eu et ad dolor aliqua commodo
        nostrud proident. Ullamco laborum culpa ut aute eu esse exercitation
        commodo qui eiusmod aute. Laboris culpa laboris est ullamco. Mollit
        proident sit aliquip proident cupidatat.
      </Container>
      <Container fluid className={styles.postActionBtnContainer}>
        <Button className={styles.actionBtn}>Submit assignment</Button>
        <div className={styles.postEditBtn}>
          <i className="bi bi-pencil-fill"></i>
        </div>
        <div className={styles.postEditBtn} style={{ color: "gray" }}>
          <i className="bi bi-trash2-fill"></i>
        </div>
      </Container>
    </Container>
  );
}
