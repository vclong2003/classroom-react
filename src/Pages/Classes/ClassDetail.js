import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function ClassDetail() {
  const params = useParams();
  return <Container>{params.classId}</Container>;
}
