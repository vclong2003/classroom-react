import { useContext, useState } from "react";
import { Badge, Button, Container, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { RoleContext } from "../..";
import ConfirmationPopup from "../../Components/ComfirmationPopup";
import { readableDateTimeConvert } from "../../Components/ReadableDateTimeConverter";
import { deletePost } from "../../Services/SymfonyApi/PostHandler";
import styles from "./style.module.css";

export default function PostItem({
  data = {
    id: 0,
    content: "",
    dateAdded: "",
    isAssignment: true,
    asmId: null,
  },
}) {
  const navigate = useNavigate();
  const params = useParams();
  const classId = params.classId;
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
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleEditBtn = () => {
    navigate(`postWriter/${data.id}`);
  };
  const handleDeletePost = () => {
    deletePost(classId, data.id, () => {
      setDeleteModalVisible(false);
      console.log("post deleted!");
    });
  };

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
            <div />
          )}
        </ExcludeContent>
        <ProtectedContent>
          {data.isAssignment ? (
            <Badge pill bg="secondary" text="light" className={styles.asmBadge}>
              Assignment
            </Badge>
          ) : (
            <div />
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
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
      <Container fluid className={styles.postActionBtnContainer}>
        <ProtectedContent>
          <div className={styles.postEditBtn} onClick={handleEditBtn}>
            <i className="bi bi-pencil-fill"></i> Edit
          </div>
          <div
            className={styles.postEditBtn}
            style={{ color: "gray" }}
            onClick={() => {
              setDeleteModalVisible(true);
            }}
          >
            <i className="bi bi-trash2-fill"></i> Delete
          </div>
        </ProtectedContent>
        <ExcludeContent>
          {data.isAssignment ? (
            data.asmId ? (
              <Button className={styles.actionBtn}>Edit assignment</Button>
            ) : (
              <Button className={styles.actionBtn}>Submit assignment</Button>
            )
          ) : (
            <div />
          )}
        </ExcludeContent>
      </Container>
      <ConfirmationPopup
        message="Do you really want to delete this post?"
        visible={deleteModalVisible}
        handleClose={() => {
          setDeleteModalVisible(false);
        }}
        handleConfirm={() => {
          handleDeletePost();
        }}
      />
    </Container>
  );
}
