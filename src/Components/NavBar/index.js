import styles from "./style.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logout } from "../../Services/SymfonyApi/AuthHandler";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

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
            <Nav.Link href="/#" className={styles.navLink}>
              Link
            </Nav.Link>
            <NavDropdown title="Dropdown" className={styles.navLink}>
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
