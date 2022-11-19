import styles from "./style.module.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { getRole } from "../../Services/SymfonyApi/UserHandler";
import {
  addClassroom,
  getClassroom,
} from "../../Services/SymfonyApi/ClassHandler";
import ClassroomItem from "./ClassroomItem";
import { Routes, Route } from "react-router-dom";
import ClassDetail from "../ClassDetail";

export default function Classes() {
  const [role, setRole] = useState("student");
  const [showAddModal, setShowAddModal] = useState(false);
  const [classroomList, setClassroomList] = useState([]);

  useEffect(() => {
    getRole((role) => {
      setRole(role);
    });
    fetchClassroomList();
  }, []);

  function fetchClassroomList() {
    getClassroom((data) => {
      setClassroomList(data);
    });
  }

  function AllClass() {
    return (
      <Container>
        <Row>
          <Col xl={10} xxl={10}>
            <Form.Control type="text" />
          </Col>
          <Col xl={2} xxl={2}>
            <Button>Search</Button>
          </Col>
        </Row>
        {/* TEACHER ADD BTN */}
        {role === "teacher" ? (
          <Container>
            <Button
              onClick={() => {
                setShowAddModal(true);
              }}
            >
              Add class
            </Button>
          </Container>
        ) : (
          ""
        )}
        <Row>
          {/* RENDER CLASSROOM ITEMS HERE */}
          {classroomList.map((item, index) => {
            return (
              <ClassroomItem
                classroom={item}
                key={index}
                role={role}
                addStudentCallback={() => {
                  fetchClassroomList();
                }}
              />
            );
          })}
        </Row>
        {role === "teacher" ? (
          <AddClass
            isVisible={showAddModal}
            handleClose={() => {
              setShowAddModal(false);
            }}
            addedCallback={() => {
              fetchClassroomList();
            }}
          />
        ) : (
          ""
        )}
      </Container>
    );
  }

  return (
    <Routes>
      <Route path="" element={<AllClass />} />
      <Route path=":classId" element={<ClassDetail />} />
    </Routes>
  );
}

function AddClass({ isVisible, handleClose, addedCallback }) {
  const [classname, setClassname] = useState("");

  return (
    <Modal
      show={isVisible}
      onHide={() => {
        handleClose();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add class</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          placeholder="Class name"
          value={classname}
          onChange={(evt) => {
            setClassname(evt.target.value);
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            handleClose(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            addClassroom(classname, () => {
              handleClose(false);
              addedCallback();
            });
          }}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
