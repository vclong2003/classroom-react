import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Routes, Route } from "react-router-dom";
import { getRole } from "../../Services/SymfonyApi/AuthHandler";
import styles from "./style.module.css";
import { Button, Container, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ClassroomItem from "./ClassroomItem";
import { motion } from "framer-motion";
import {
  addClassroom,
  getClassrooms,
} from "../../Services/SymfonyApi/ClassHandler";

export default function AllClassPage() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    getRole((role) => {
      setRole(role);
    });
  }, []);

  return (
    <Routes>
      <Route
        path=""
        element={
          role == null ? <LoadingSpinner /> : <AuthorizedPage role={role} />
        }
      />
      {/* <Route path=":classId" element={} /> */}
    </Routes>
  );
}

function AuthorizedPage({ role }) {
  const [addClassModalVisible, setAddClassModalVisible] = useState(false);
  const [classroomList, setClassroomList] = useState([]);
  const [loadingClassList, setLoadingClassList] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const getClassroomList = () => {
    setClassroomList([]);
    setLoadingClassList(true);
    getClassrooms(searchVal, (data) => {
      console.log(data);
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
    console.log("open " + id);
  };

  const handleJoinClass = (id) => {
    console.log("join " + id);
  };

  useEffect(() => {
    getClassroomList();
  }, [searchVal]);

  return (
    <Container fluid className={styles.container}>
      <Container className={styles.searchContainer}>
        <Form.Control
          type="text"
          placeholder="Enter class name to search..."
          className={styles.searchInput}
          value={searchVal}
          onChange={(evt) => {
            setSearchVal(evt.target.value);
          }}
        />
        {searchVal == "" ? (
          ""
        ) : (
          <Button
            className={styles.searchBtn}
            onClick={() => {
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
        ""
      )}
    </Container>
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
            className={styles.addModalBtn}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              addCallback(className);
            }}
            className={styles.addModalBtn}
            style={{ backgroundColor: "#545382", color: "white" }}
          >
            Add
          </Button>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
