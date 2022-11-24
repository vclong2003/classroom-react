import React, { useEffect, useRef, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getRole } from "../../Services/SymfonyApi/AuthHandler";
import styles from "./style.module.css";
import { Button, Container, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ClassroomItem from "./ClassroomItem";
import { motion } from "framer-motion";
import {
  addClassroom,
  getClassrooms,
  joinClass,
} from "../../Services/SymfonyApi/ClassHandler";
import ClassDetail from "../ClassDetail";

export default function AllClassPage() {
  const [role, setRole] = useState(null);
  useEffect(() => {
    getRole((role) => {
      setRole(role);
    });
  }, []);

  const navigate = useNavigate();

  const [addClassModalVisible, setAddClassModalVisible] = useState(false);
  const [joinClassModalVisible, setJoinClassModalVisible] = useState(false);
  const [classroomList, setClassroomList] = useState([]);
  const [loadingClassList, setLoadingClassList] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const searchInput = useRef();

  const getClassroomList = () => {
    setClassroomList([]);
    setLoadingClassList(true);
    getClassrooms(searchVal, (data) => {
      setLoadingClassList(false);
      setClassroomList(data);
    });
  };

  const handleAddClass = (className) => {
    addClassroom(className, () => {
      getClassroomList();
    });
  };
  const handleOpenClass = (id) => {
    navigate(`${id}`);
  };
  const handleJoinClass = (id) => {
    joinClass(id, () => {
      getClassroomList();
    });
  };

  useEffect(() => {
    getClassroomList();
  }, [searchVal]);

  const authorizedContent = (
    <Container fluid className={styles.container}>
      <Container className={styles.searchContainer}>
        <Form.Control
          type="text"
          placeholder="Enter class name to search..."
          className={styles.searchInput}
          onChange={(evt) => {
            setTimeout(() => {
              setSearchVal(evt.target.value);
            }, 1000);
          }}
          ref={searchInput}
        />
        {searchVal === "" ? (
          ""
        ) : (
          <Button
            className={styles.searchBtn}
            onClick={() => {
              searchInput.current.value = "";
              setSearchVal("");
            }}
          >
            Cancel
          </Button>
        )}
      </Container>
      <Container className={styles.classItemsContainer}>
        {loadingClassList ? (
          <LoadingSpinner />
        ) : role === "teacher" ? (
          <motion.div
            initial={{ borderRadius: "10px" }}
            whileHover={{
              rotate: 180,
            }}
            whileTap={{ scale: 0.8 }}
            className={styles.addBtn}
            onClick={() => {
              setAddClassModalVisible(true);
            }}
          >
            <i className="bi bi-plus-circle"></i>
          </motion.div>
        ) : (
          ""
        )}
        {/* RENDER CLASSROOM ITEMS HERE */}
        {classroomList.map((item, index) => {
          return (
            <ClassroomItem
              classInfo={item}
              key={index}
              role={role}
              joinCallBack={(id) => {
                handleJoinClass(id);
              }}
              openCallBack={(id) => {
                handleOpenClass(id);
              }}
            />
          );
        })}
      </Container>
      {role === "teacher" ? (
        <AddClassModal
          visible={addClassModalVisible}
          cancelCallback={() => {
            setAddClassModalVisible(false);
          }}
          addCallback={(className) => {
            setAddClassModalVisible(false);
            handleAddClass(className);
          }}
        />
      ) : (
        <JoinClassModal
          visible={joinClassModalVisible}
          cancelCallback={() => {
            setJoinClassModalVisible(false);
          }}
        />
      )}
    </Container>
  );

  return (
    <Routes>
      <Route
        path=""
        element={role == null ? <LoadingSpinner /> : authorizedContent}
      />
      <Route path=":classId" element={<ClassDetail role={role} />} />
    </Routes>
  );
}

function LoadingSpinner() {
  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "60px",
        marginBottom: "60px",
      }}
    >
      <Spinner animation="border" />
    </Container>
  );
}

function AddClassModal({ visible, cancelCallback, addCallback }) {
  const [className, setClassName] = useState("");

  return (
    <Modal
      centered
      show={visible}
      onHide={() => {
        cancelCallback();
      }}
    >
      <Modal.Body className={styles.addModal}>
        <Form.Control
          type="text"
          placeholder="Enter class name..."
          onChange={(evt) => {
            setClassName(evt.target.value);
          }}
          className={styles.addModalInput}
        />
        <Container fluid>
          <Button
            variant="secondary"
            onClick={() => {
              cancelCallback();
            }}
            className={styles.modalBtn}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              addCallback(className);
            }}
            className={styles.modalBtn}
            style={{ backgroundColor: "#545382", color: "white" }}
          >
            Add
          </Button>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

function JoinClassModal({ visible, confirmCallback, cancelCallback }) {
  return (
    <Modal show={visible} onHide={cancelCallback} centered>
      <Modal.Body>
        <Container>Woohoo, you're reading this text in a modal!</Container>
        <Container fluid>
          <Button
            variant="secondary"
            onClick={() => {
              cancelCallback();
            }}
            className={styles.modalBtn}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              confirmCallback();
            }}
            className={styles.modalBtn}
            style={{ backgroundColor: "#545382", color: "white" }}
          >
            Join
          </Button>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
