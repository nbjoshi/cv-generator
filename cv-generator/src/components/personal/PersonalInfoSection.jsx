import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/personal/PersonalInfoSection.css";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

export default function PersonalInfoSection({
  email,
  fullName,
  phoneNumber,
  address,
}) {
  return (
    <div className="personal-info">
      <div className="resume-name">{fullName}</div>
      <div className="contact-info">
        <div> {email}</div>
        <div> {phoneNumber}</div>
        <div> {address}</div>
      </div>
    </div>
  );
}
