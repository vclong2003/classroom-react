import styles from "./style.module.css";
import Badge from "react-bootstrap/Badge";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Col, Container, Image, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import randomColor from "randomcolor";

export default function ClassroomItem({
  classInfo,
  role = "teacher",
  openCallBack,
  joinCallBack,
}) {
  return (
    <motion.div
      className={styles.container}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        role === "teacher" ? openCallBack() : joinCallBack();
      }}
    >
      <Container
        className={styles.top}
        style={{
          backgroundColor: randomColor({ luminosity: "light", hue: "random" }),
        }}
      >
        <Row className={styles.teacherInfoContainer}>
          <Col xl={4} xxl={4}>
            <Image
              src={require("../../../Assets/userPlaceholder.png")}
              roundedCircle
              fluid
            />
          </Col>
          <Col xl={8} xxl={8} className={styles.teacherName}>
            Vu Cong Long
          </Col>
        </Row>
      </Container>
      <Container fluid className={styles.body}>
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip>Longgg class nameeeeeeeeeee</Tooltip>}
        >
          <Container className={styles.className}>
            {role === "student" ? (
              <Badge pill bg="warning" text="dark">
                Joined
              </Badge>
            ) : (
              ""
            )}{" "}
            Longgg class nameeeeeeeeeee
          </Container>
        </OverlayTrigger>
        <Container className={styles.classDescription}>
          Start: 2099 - 10 -13
          <br />
          Students: 14
        </Container>
      </Container>
    </motion.div>
  );
}
