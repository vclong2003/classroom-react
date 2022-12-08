import styles from "./style.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logout } from "../../Services/SymfonyApi/AuthHandler";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  getUserInfo,
  setUserRole,
} from "../../Services/SymfonyApi/UserHandler";
import { RoleContext } from "../..";

export default function NavBar() {
  const navigate = useNavigate();
  const role = useContext(RoleContext);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    getUserInfo((data) => {
      setUserName(data.name);
    });
  }, []);

  const handleSwitchRole = () => {
    setUserRole(role === "teacher" ? "student" : "teacher", () => {
      window.location.href = "/";
    });
  };

  return (
    <Navbar expand="lg" variant="dark" className={styles.navBar}>
      <Container>
        <Navbar.Brand href="/" className={styles.logo}>
          VCL
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={styles.nav}>
            <Nav.Link
              onClick={() => {
                navigate("/class");
              }}
              className={styles.navLink}
            >
              Classes
            </Nav.Link>
            {userName === null ? (
              <div />
            ) : (
              <NavDropdown title={userName} className={styles.navLink}>
                <NavDropdown.Item
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleSwitchRole}>
                  Change to {role === "teacher" ? "Student" : "Teacher"}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
