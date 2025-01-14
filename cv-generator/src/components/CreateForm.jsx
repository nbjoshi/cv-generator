import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../styles/CreateForm.css";

export default function CreateForm({ onClick, buttonText }) {
  return (
    <button className="create-form" onClick={onClick}>
      <h4 className="button-content">
        <FontAwesomeIcon icon={faPlus} />
        {buttonText}
      </h4>
    </button>
  );
}
