import { Container, Spinner } from "react-bootstrap";

export default function LoadingSpinner() {
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
