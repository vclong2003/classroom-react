import { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const createNewAccount = () => {
    fetch("https://127.0.0.1:8000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then((response) => response.json())
      .then((msg) => {
        console.log("Success:", msg);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const hanldeSubmit = (evt) => {
    evt.preventDefault();
    createNewAccount();
  };

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="Text"
            placeholder="Enter name"
            onChange={(evt) => {
              setValue({ ...value, name: evt.target.value });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(evt) => {
              setValue({ ...value, email: evt.target.value });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(evt) => {
              setValue({ ...value, password: evt.target.value });
            }}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={(evt) => {
            hanldeSubmit(evt);
          }}
        >
          Register
        </Button>
      </Form>
    </Container>
  );
}
