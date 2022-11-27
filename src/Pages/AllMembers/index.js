import { useContext } from "react";
import { RoleContext } from "../..";
import StudentAllMemberPage from "./StudentAllMemberPage";
import TeacherAllMemberPage from "./TeacherAllMemberPage";

export default function AllMemberPage() {
  const role = useContext(RoleContext);
  if (role === "teacher") {
    return <TeacherAllMemberPage />;
  } else if (role === "student") {
    return <StudentAllMemberPage />;
  }
}
