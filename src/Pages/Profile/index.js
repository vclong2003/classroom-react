import styles from "./style.module.css";
import {
  Badge,
  Button,
  Container,
  Form,
  Modal,
  Ratio,
} from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import {
  getUserInfo,
  updateUserInfo,
} from "../../Services/SymfonyApi/UserHandler";
import { RoleContext } from "../..";
import LoadingSpinner from "../../Components/LoadingAnimation/Spinner";
import { motion } from "framer-motion";
import { uploadFile } from "../../Services/Firebase";
import AvatarItem from "../../Components/Avatar";

export default function ProfilePage() {
  const role = useContext(RoleContext);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    address: "",
    dob: null,
    imageUrl: "",
    name: "",
    phoneNumber: "",
  });
  const [infoEditorVisible, setInfoEditorVisible] = useState(false);
  const [avaFilePickerVisible, setAvaFilePickerVisible] = useState(false);

  const fetchUserInfo = () => {
    setLoading(true);
    getUserInfo((data) => {
      setUserInfo(data);
      setLoading(false);
    });
  };

  const handleEditBtn = () => {
    setInfoEditorVisible(true);
  };
  const updateInfo = (info) => {
    updateUserInfo(
      info.name,
      info.dob,
      info.phoneNumber,
      info.address,
      info.imageUrl,
      () => {
        setUserInfo({ ...userInfo, ...info });
        setInfoEditorVisible(false);
      }
    );
  };
  const updateAvatar = (file) => {
    uploadFile(
      `avatar/${userInfo.userId}`,
      file,
      (progress) => {
        console.log(progress);
      },
      (url) => {
        updateUserInfo(
          userInfo.name,
          userInfo.dob,
          userInfo.phoneNumber,
          userInfo.address,
          url,
          () => {
            setUserInfo({ ...userInfo, imageUrl: url });
            setAvaFilePickerVisible(false);
          }
        );
      }
    );
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <Container fluid className={styles.container}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Container className={styles.avatarContainer}>
            <Ratio aspectRatio="1x1" className={styles.avatar}>
              <>
                <AvatarItem source={userInfo.imageUrl} />
                <motion.button
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className={styles.editAvatarBtn}
                  onClick={() => {
                    setAvaFilePickerVisible(true);
                  }}
                >
                  <i className="bi bi-pencil-square"></i>
                </motion.button>
              </>
            </Ratio>
            <div className={styles.name}>
              {userInfo.name}{" "}
              <Badge pill bg="info">
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Badge>
            </div>
          </Container>
          <Container>
            <div className={styles.infoField}>
              <span className={styles.fieldTitle}>Date of birth: </span>
              {userInfo.dob ? userInfo.dob : "Not set"}
            </div>
            <div className={styles.infoField}>
              <span className={styles.fieldTitle}>Phone number: </span>
              {userInfo.phoneNumber ? userInfo.phoneNumber : "Not set"}
            </div>
            <div className={styles.infoField}>
              <span className={styles.fieldTitle}>Address: </span>
              {userInfo.address ? userInfo.address : "Not set"}
            </div>
            <Button className={styles.editInfoBtn} onClick={handleEditBtn}>
              Edit
            </Button>
          </Container>
          <AvatarFilePicker
            visible={avaFilePickerVisible}
            handleClose={() => {
              setAvaFilePickerVisible(false);
            }}
            handleUpdate={updateAvatar}
          />
          <InfoEditor
            initValue={userInfo}
            visible={infoEditorVisible}
            handleClose={() => {
              setInfoEditorVisible(false);
            }}
            handleUpdate={updateInfo}
          />
        </>
      )}
    </Container>
  );
}

function AvatarFilePicker({ visible, handleClose, handleUpdate }) {
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (visible === false) {
      setFile(null);
    }
  }, [visible]);

  const handleSaveBtn = () => {
    if (file) {
      handleUpdate(file);
    }
  };

  return (
    <Modal show={visible} onHide={handleClose}>
      <Modal.Body>
        {file ? (
          <Ratio aspectRatio="1x1" className={styles.avatarPreviewContainer}>
            <AvatarItem source={URL.createObjectURL(file)} />
          </Ratio>
        ) : (
          ""
        )}
        <Form.Control
          type="file"
          accept="image/*"
          onChange={(evt) => {
            setFile(evt.target.files[0]);
          }}
          className={styles.avatarFileInput}
        />
        <Button className={styles.editInfoBtn} onClick={handleSaveBtn}>
          Save
        </Button>
        <Button
          className={styles.editInfoBtn}
          onClick={() => {
            handleClose();
          }}
        >
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  );
}

function InfoEditor({ initValue, visible, handleClose, handleUpdate }) {
  const [info, setInfo] = useState(initValue);

  const handleCancel = () => {
    setInfo(initValue);
    handleClose();
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleUpdate(info);
  };

  return (
    <Modal centered show={visible} onHide={handleCancel}>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              className={styles.editorInput}
              value={info.name ? info.name : ""}
              onChange={(evt) => {
                setInfo({ ...info, name: evt.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              className={styles.editorInput}
              value={info.dob ? info.dob : ""}
              onChange={(evt) => {
                setInfo({ ...info, dob: evt.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              className={styles.editorInput}
              value={info.phoneNumber ? info.phoneNumber : ""}
              onChange={(evt) => {
                setInfo({ ...info, phoneNumber: evt.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              className={styles.editorInput}
              value={info.address ? info.address : ""}
              onChange={(evt) => {
                setInfo({ ...info, address: evt.target.value });
              }}
            />
          </Form.Group>
          <Button type="submit" className={styles.editInfoBtn}>
            Update
          </Button>
          <Button className={styles.editInfoBtn} onClick={handleCancel}>
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
