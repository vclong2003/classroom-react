import { Image } from "react-bootstrap";

export default function AvatarItem({ source }) {
  return (
    <Image
      roundedCircle
      fluid
      style={{ objectFit: "cover" }}
      src={source ? source : require("../../Assets/userPlaceholder.png")}
    />
  );
}
