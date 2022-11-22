import { useState } from "react";
import { getClassroom } from "../../Services/SymfonyApi/ClassHandler";
import styles from "./style.module.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export default function TeacherClassesPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [classroomList, setClassroomList] = useState([]);

  return (
    <Container fluid>
      <Container className={styles.searchContainer}>
        <Form.Control type="text" className={styles.searchInput}/>
        <Button className={styles.searchBtn}>Search</Button>
      </Container>
      <Container>
        <Button
          onClick={() => {
            setShowAddModal(true);
          }}
        >
          Add class
        </Button>
      </Container>
      <Row>{/* RENDER CLASSROOM ITEMS HERE */}</Row>
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
