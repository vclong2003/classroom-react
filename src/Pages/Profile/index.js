import styles from "./style.module.css";
import { Badge, Button, Container, Image, Ratio } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { getUserInfo } from "../../Services/SymfonyApi/UserHandler";
import { RoleContext } from "../..";
import LoadingSpinner from "../../Components/LoadingAnimation/Spinner";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const role = useContext(RoleContext);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    address: "",
    dob: null,
    id: 0,
    imageUrl: "",
    name: "",
    phoneNumber: "",
    userId: 0,
  });
  const [updateMode, setUpdateMode] = useState(true);

  const fetchUserInfo = () => {
    setLoading(true);
    getUserInfo((data) => {
      setUserInfo(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <Container fluid className={styles.container}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Container className={styles.avatarContainer}>
            <Ratio aspectRatio="1x1" className={styles.avatar}>
              <>
                <Image
                  fluid
                  roundedCircle
                  src={
                    userInfo.imageUrl
                      ? userInfo.imageUrl
                      : require("../../Assets/userPlaceholder.png")
                  }
                />
                <motion.button
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  whileTap={{ scale: 0.8 }}
                  className={styles.editAvatarBtn}
                >
                  <i className="bi bi-pencil-square"></i>
                </motion.button>
              </>
            </Ratio>
            <div className={styles.name}>
              {userInfo.name}{" "}
              <Badge pill bg="info">
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Badge>
            </div>
          </Container>
        </>
      )}
    </Container>
  );
}
