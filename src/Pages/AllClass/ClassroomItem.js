import styles from "./classroomItemStyle.module.css";
import Badge from "react-bootstrap/Badge";
import { Col, Container, Image, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import randomColor from "random-color";

export default function ClassroomItem({
  classInfo,
  role,
  openCallBack,
  joinCallBack,
}) {
  const dateObj = new Date(Date.parse(classInfo.startDate));

  const data = {
    classId: classInfo.id,
    className: classInfo.name,
    teacherName: classInfo.teacherName,
    teacherImageUrl: classInfo.teacherImageUrl
      ? classInfo.teacherImageUrl
      : require("../../Assets/userPlaceholder.png"),
    startDate: dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    studentCount: classInfo.studentCount,
    isJoined: classInfo.isJoined,
  };

  let color = randomColor(0.3, 0.91);
  return (
    <motion.div
      className={styles.container}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        role === "teacher" || data.isJoined
          ? openCallBack(data.classId)
          : joinCallBack(data.classId);
      }}
    >
      <Container
        className={styles.top}
        style={{
          backgroundColor: color.hexString(),
        }}
      >
        <Row className={styles.teacherInfoContainer}>
          <Col xl={4} xxl={4}>
            <Image src={data.teacherImageUrl} roundedCircle fluid />
          </Col>
          <Col xl={8} xxl={8} className={styles.teacherName}>
            {data.teacherName}
          </Col>
        </Row>
      </Container>
      <Container fluid className={styles.body}>
        <Container className={styles.className}>
          {data.isJoined ? (
            <Badge pill bg="warning" text="dark">
              Joined
            </Badge>
          ) : (
            ""
          )}{" "}
          {data.className}
        </Container>
        <Container className={styles.classDescription}>
          Start: {data.startDate}
          <br />
          Students: {data.studentCount}
        </Container>
      </Container>
    </motion.div>
  );
}
