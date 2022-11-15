import { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { login } from "../../Components/AuthenticationHandler";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hanldeSubmit = (evt) => {
    evt.preventDefault();
    login(email, password);
  };

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(evt) => {
              setEmail(evt.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(evt) => {
              setPassword(evt.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Text
            onClick={() => {
              navigate("/register");
            }}
          >
            Or, create an account!
          </Form.Text>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={(evt) => {
            hanldeSubmit(evt);
          }}
        >
          Login
        </Button>
      </Form>
    </Container>
  );
}
