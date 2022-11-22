import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Routes, Route } from "react-router-dom";
import { getRole } from "../../Services/SymfonyApi/AuthHandler";
import styles from "./style.module.css";
import { Button, Container, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ClassroomItem from "./Components/ClassroomItem";
import { motion } from "framer-motion";
import { getClassrooms } from "../../Services/SymfonyApi/ClassHandler";

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

function LoadingSpinner() {
  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <Spinner animation="border" />
    </Container>
  );
}

function AuthorizedPage({ role }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [classroomList, setClassroomList] = useState([]);

  function getClassroomList() {
    getClassrooms((data) => {
      console.log(data);
      setClassroomList(data);
    });
  }

  function handleOpenClass(id) {}

  useEffect(() => {
    getClassroomList();
  }, []);

  return (
    <Container fluid className={styles.container}>
      <Container className={styles.searchContainer}>
        <Form.Control
          type="text"
          placeholder="Enter class name to search..."
          className={styles.searchInput}
        />
        <Button className={styles.searchBtn}>Search</Button>
      </Container>
      <Container className={styles.classItemsContainer}>
        <motion.div
          initial={{ borderRadius: "10px" }}
          whileHover={{
            rotate: 180,
          }}
          whileTap={{ scale: 0.8 }}
          className={styles.addBtn}
        >
          <i className="bi bi-plus-circle"></i>
        </motion.div>
        {/* RENDER CLASSROOM ITEMS HERE */}
        <ClassroomItem />
        <ClassroomItem />
        <ClassroomItem />
        <ClassroomItem />
        <ClassroomItem />
      </Container>
      <Modal
        show={showAddModal}
        onHide={() => {
          setShowAddModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Class name"
            onChange={(evt) => {}}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowAddModal(false);
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {}}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
