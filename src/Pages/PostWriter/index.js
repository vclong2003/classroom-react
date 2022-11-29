import { useNavigate, useParams } from "react-router-dom";

import styles from "./style.module.css";
import { Badge, Button, Container, Form } from "react-bootstrap";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useContext, useEffect, useState } from "react";
import { RoleContext } from "../..";
import {
  addPost,
  getSinglePost,
  updatePost,
} from "../../Services/SymfonyApi/PostHandler";
import LoadingSpinner from "../../Components/LoadingAnimation/Spinner";

export default function PostWriterPage({ postsRefresher }) {
  const navigate = useNavigate();
  const role = useContext(RoleContext);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [mode, setMode] = useState("add");
  const [postContent, setPostContent] = useState("");
  const [isAsm, setIsAsm] = useState(false);
  const params = useParams();
  const classId = params.classId;
  const postId = params.postId;
  useEffect(() => {
    if (postId) {
      setMode("update");
      setLoading(true);
      getSinglePost(classId, postId, (data) => {
        setIsAsm(data.isAssignment);
        setPostContent(data.content);
        setLoading(false);
      });
    }
  }, [postId, classId]);

  const handleAddPost = () => {
    setSaving(true);
    addPost(classId, isAsm, postContent, () => {
      setSaving(false);
      navigate(-1);
      postsRefresher();
    });
  };
  const handleUpdatePost = () => {
    updatePost(classId, postId, isAsm, postContent, () => {
      setSaving(false);
      navigate(-1);
      postsRefresher();
    });
  };
  const handleCancel = () => {
    navigate(-1);
  };

  if (role === "teacher") {
    return loading ? (
      <LoadingSpinner />
    ) : (
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
          {mode === "add" ? (
            <Button
              className={styles.actionBtn}
              onClick={handleAddPost}
              disabled={saving}
            >
              Add
            </Button>
          ) : (
            ""
          )}
          {mode === "update" ? (
            <Button
              className={styles.actionBtn}
              onClick={handleUpdatePost}
              disabled={saving}
            >
              Save changes
            </Button>
          ) : (
            ""
          )}
          <Button
            className={styles.actionBtn}
            style={{ backgroundColor: "gray" }}
            onClick={handleCancel}
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
