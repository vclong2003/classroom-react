import { useNavigate, useParams } from "react-router-dom";

import styles from "./style.module.css";
import { Button, Container } from "react-bootstrap";
import RichTextEditor from "../../Components/RichTextEditor";
import { useContext, useState } from "react";
import { RoleContext } from "../..";

export default function AddPostPage() {
  const navigate = useNavigate();
  const role = useContext(RoleContext);
  function ProtectedContent({ children }) {
    if (role === "teacher") {
      return children;
    } else {
      setTimeout(() => {
        navigate("/");
      }, 2000);
      return (
        <Container>
          <h1>You are not allowed to view this page!</h1>
        </Container>
      );
    }
  }
  const params = useParams();
  const [postContent, setPostContent] = useState("");

  const handleAddPost = () => {};
  const handleCancel = () => {};

  return (
    <ProtectedContent>
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
    </ProtectedContent>
  );
}
