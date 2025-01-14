import "../styles/ExpandSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function ExpandSection({ isOpen, setOpen, sectionName, icon }) {
  return (
    <button
      className="expand-section"
      onClick={() => setOpen(isOpen ? "" : sectionName)}
    >
      <h2 className="expand-section-header">
        {icon}
        {sectionName}
      </h2>
      <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
    </button>
  );
}
