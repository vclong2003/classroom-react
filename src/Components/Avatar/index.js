import { Image, Ratio } from "react-bootstrap";

export default function AvatarItem({ source }) {
  return (
    <Ratio aspectRatio="1x1">
      <Image
        roundedCircle
        fluid
        style={{ objectFit: "cover" }}
        src={source ? source : require("../../Assets/userPlaceholder.png")}
      />
    </Ratio>
  );
}
