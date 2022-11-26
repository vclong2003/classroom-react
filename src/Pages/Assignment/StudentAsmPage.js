import styles from "./style.module.css";
import {
  Button,
  Col,
  Container,
  Form,
  ProgressBar,
  Row,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../Components/LoadingAnimation/Spinner";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../../Services/SymfonyApi/PostHandler";
import uuid from "react-uuid";
import { uploadFile } from "../../Services/Firebase";
import { addAsm } from "../../Services/SymfonyApi/AssignmentHandler";

export default function StudentAsmPage() {
  const params = useParams();
  const classId = params.classId;
  const postId = params.postId;

  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [postData, setPostData] = useState("");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleAddAsm = () => {
    if (file) {
      const folderName = `assignment/${postId}/${uuid()}`;
      uploadFile(
        folderName,
        file,
        (progress) => {
          setUploadProgress(progress);
        },
        (url) => {
          addAsm(classId, postId, url, () => {
            console.log("added");
          });
        }
      );
    }
  };

  useEffect(() => {
    setPostLoading(true);
    getSinglePost(classId, postId, (data) => {
      setPostData(data);
      setPostLoading(false);
      console.log(data);
    });
  }, []);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <Container fluid className={styles.container}>
      <Container>
        <Row>
          <Col xl={9} xxl={9}>
            {postLoading ? (
              <LoadingSpinner />
            ) : (
              <Container
                className={styles.postContent}
                dangerouslySetInnerHTML={{ __html: postData.content }}
              />
            )}
          </Col>
          <Col xl={3} xxl={3} className={styles.asmContainer}>
            <Container>
              <ProgressBar
                striped
                variant="info"
                now={uploadProgress}
                style={{
                  visibility: uploadProgress === 0 ? "hidden" : "unset",
                  marginBottom: "12px",
                }}
              />
              <Form.Control
                type="file"
                onChange={(evt) => {
                  setFile(evt.target.files[0]);
                }}
              />

              <Button className={styles.submitBtn} onClick={handleAddAsm}>
                Submit
              </Button>
            </Container>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
