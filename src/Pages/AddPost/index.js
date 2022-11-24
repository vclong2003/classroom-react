import { useParams } from "react-router-dom";

import styles from "./style.module.css";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import RichTextEditor from "../../Components/RichTextEditor";
import { useState } from "react";

export default function AddPostPage() {
  const params = useParams();
  const [postContent, setPostContent] = useState("");

  return (
    <Container fluid className={styles.container}>
      <Container className={styles.title}>
        Post something to your class
      </Container>
      <Container>
        <RichTextEditor
          onChangeCallback={(value) => {
            setPostContent(value);
            console.log(value);
          }}
        />
      </Container>
      <Container className={styles.actionBtnContainer}>
        <Button className={styles.actionBtn}>Save</Button>
        <Button
          className={styles.actionBtn}
          style={{ backgroundColor: "gray" }}
        >
          Cancel
        </Button>
      </Container>
    </Container>
  );
}
