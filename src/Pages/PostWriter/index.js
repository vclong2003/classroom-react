import { useNavigate, useParams } from "react-router-dom";

import styles from "./style.module.css";
import { Badge, Button, Container, Form } from "react-bootstrap";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useContext, useEffect, useState } from "react";
import { RoleContext } from "../..";

export default function PostWriterPage() {
  const navigate = useNavigate();
  const role = useContext(RoleContext);

  const params = useParams();
  const classId = params.classId;
  const [postContent, setPostContent] = useState("");
  const [isAsm, setIsAsm] = useState(false);

  useEffect(() => {
    console.log(postContent);
  }, [postContent]);

  const handleAddPost = () => {};
  const handleCancel = () => {};

  if (role === "teacher") {
    return (
      <Container fluid className={styles.container}>
        <Container className={styles.title}>
          Post something to your class
        </Container>
        <Container className={styles.optionBtnContainer}>
          <Badge pill bg={isAsm ? "info" : "secondary"}>
            Assignment
          </Badge>
          <div style={{ width: "8px" }} />
          <Form.Check
            type="switch"
            checked={isAsm}
            onChange={(evt) => {
              setIsAsm(evt.target.checked);
            }}
          />
        </Container>
        <Container>
          <ReactQuill
            theme="snow"
            style={{ backgroundColor: "white" }}
            value={postContent}
            onChange={setPostContent}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image"],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "indent",
              "link",
              "image",
            ]}
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
