import { useContext } from "react";
import { RoleContext } from "../..";
import StudentAsmPage from "./StudentAsmPage";
import TeacherAsmPage from "./TeacherAsmPage";

export default function AssignmentPage({ postsRefresher }) {
  const role = useContext(RoleContext);
  if (role === "student") {
    return <StudentAsmPage postsRefresher={postsRefresher} />;
  } else if (role === "teacher") {
    return <TeacherAsmPage />;
  }
}
