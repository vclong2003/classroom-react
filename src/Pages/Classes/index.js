import styles from "./style.module.css";
import Card from "react-bootstrap/Card";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import { useEffect, useState } from "react";
import { getRole } from "../../Services/SymfonyApi/UserHandler";
import {
  addClassroom,
  getClassroom,
} from "../../Services/SymfonyApi/ClassHandler";
import ClassroomItem from "./ClassroomItem";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "../Authentication/Login";
import ClassDetail from "./ClassDetail";

export default function Classes() {
  const navigate = useNavigate();
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

  return (
    <Routes>
      <Route path="/" element={<Navigate to="all" />} />
      <Route
        path="all"
        element={
          <Container>
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
                return <ClassroomItem classroom={item} key={index} />;
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
        }
      />
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
