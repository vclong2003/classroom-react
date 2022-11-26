import { Button, Container, Modal } from "react-bootstrap";
import styles from "./style.module.css";

export default function ConfirmationPopup({
  message,
  visible,
  handleClose,
  handleConfirm,
}) {
  return (
    <Modal centered show={visible} onHide={handleClose}>
      <Modal.Body>
        <Container className={styles.message}>{message}</Container>
        <Container>
          <Button onClick={handleConfirm} className={styles.btn}>
            Confirm
          </Button>
          <Button
            onClick={handleClose}
            className={styles.btn}
            style={{ backgroundColor: "gray" }}
          >
            Cancel
          </Button>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
