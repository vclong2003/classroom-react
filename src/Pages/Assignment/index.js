import { useContext } from "react";
import { RoleContext } from "../..";
import StudentAsmPage from "./StudentAsmPage";
import TeacherAsmPage from "./TeacherAsmPage";

export default function AssignmentPage() {
  const role = useContext(RoleContext);
  if (role === "student") {
    return <StudentAsmPage />;
  } else if (role === "teacher") {
    return <TeacherAsmPage />;
  }
}
