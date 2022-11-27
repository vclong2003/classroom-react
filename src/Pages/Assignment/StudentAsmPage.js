import styles from "./style.module.css";
import {
  Button,
  Col,
  Container,
  Form,
  ProgressBar,
  Row,
} from "react-bootstrap";
import { useEffect, useLayoutEffect, useState } from "react";
import LoadingSpinner from "../../Components/LoadingAnimation/Spinner";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../../Services/SymfonyApi/PostHandler";
import uuid from "react-uuid";
import { getFileName, uploadFile } from "../../Services/Firebase";
import {
  addAsm,
  getSingleAsm,
  updateAsm,
} from "../../Services/SymfonyApi/AssignmentHandler";

export default function StudentAsmPage() {
  const params = useParams();
  const classId = params.classId;
  const postId = params.postId;

  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState("");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [asm, setAsm] = useState(null);

  const initData = () => {
    setLoading(true);
    getSinglePost(classId, postId, (data) => {
      setPostData(data);
      if (data.asmId) {
        getSingleAsm(classId, postId, data.asmId, (asm) => {
          setAsm(asm);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  };

  function AsmDownLoadUrl() {
    const [content, setContent] = useState(<></>);
    useEffect(() => {
      if (asm) {
        getFileName(asm.fileUrl, (name) => {
          console.log(name);
          setContent(
            <Container className={styles.sumbitedAsmContainer}>
              <Container>
                <h5>Submited file</h5>
              </Container>
              <Container>
                <a href={asm.fileUrl}>{name}</a>
              </Container>
            </Container>
          );
        });
      }
    }, []);
    return content;
  }

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
            initData();
          });
        }
      );
    }
  };

  const handleUpdateAsm = () => {
    if (file && asm) {
      const folderName = `assignment/${postId}/${uuid()}`;
      uploadFile(
        folderName,
        file,
        (progress) => {
          setUploadProgress(progress);
        },
        (url) => {
          updateAsm(classId, postId, asm.id, url, () => {
            initData();
          });
        }
      );
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <Container fluid className={styles.container}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Container>
          <Row>
            <Col xl={9} xxl={9}>
              <Container
                className={styles.postContent}
                dangerouslySetInnerHTML={{ __html: postData.content }}
              />
            </Col>
            <Col xl={3} xxl={3} className={styles.asmContainer}>
              <AsmDownLoadUrl />
              <Container>
                <ProgressBar
                  striped
                  variant="info"
                  now={uploadProgress}
                  style={{
                    visibility:
                      uploadProgress === 0 || uploadProgress === 100 ? "hidden" : "unset",
                    marginBottom: "8px",
                    marginTop: "8px",
                  }}
                />
                <Form.Control
                  type="file"
                  onChange={(evt) => {
                    setFile(evt.target.files[0]);
                  }}
                />
                {asm ? (
                  <Button
                    className={styles.submitBtn}
                    onClick={handleUpdateAsm}
                  >
                    Re-Submit
                  </Button>
                ) : (
                  <Button className={styles.submitBtn} onClick={handleAddAsm}>
                    Submit
                  </Button>
                )}
              </Container>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
}
