import styles from "./classroomItemStyle.module.css";
import Badge from "react-bootstrap/Badge";
import { Col, Container, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import randomColor from "random-color";
import { readableDateTimeConvert } from "../../Components/ReadableDateTimeConverter";
import { useContext, useState } from "react";
import { RoleContext } from "../..";
import ConfirmationPopup from "../../Components/ComfirmationPopup";
import AvatarItem from "../../Components/Avatar";

export default function ClassroomItem({
  classInfo,
  openCallBack,
  joinCallBack,
}) {
  const data = {
    classId: classInfo.id,
    className: classInfo.name,
    teacherName: classInfo.teacherName,
    teacherImageUrl: classInfo.teacherImageUrl
      ? classInfo.teacherImageUrl
      : require("../../Assets/userPlaceholder.png"),
    startDate: classInfo.startDate,
    studentCount: classInfo.studentCount,
    isJoined: classInfo.isJoined,
  };

  const role = useContext(RoleContext);

  const [joinModalVisible, setJoinModalVisible] = useState(false);

  const clickHandler = () => {
    if (role === "teacher" || data.isJoined) {
      openCallBack(data.classId);
    } else {
      setJoinModalVisible(true);
    }
  };

  let color = randomColor(0.4, 0.93);
  return (
    <>
      <motion.div
        className={styles.container}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={clickHandler}
      >
        <Container
          className={styles.top}
          style={{
            backgroundColor: color.hexString(),
          }}
        >
          <Row className={styles.teacherInfoContainer}>
            <Col xl={4} xxl={4}>
              <AvatarItem source={data.teacherImageUrl} />
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
            Start: {readableDateTimeConvert(data.startDate, true)}
            <br />
            Students: {data.studentCount}
          </Container>
        </Container>
      </motion.div>
      <ConfirmationPopup
        visible={joinModalVisible}
        handleClose={() => {
          setJoinModalVisible(false);
        }}
        handleConfirm={() => {
          joinCallBack(data.classId);
        }}
        message="To interact with the class, you must join, teacher can view your infomation. Do you ant to join?"
      />
    </>
  );
}
