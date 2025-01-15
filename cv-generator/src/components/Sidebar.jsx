import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import "../styles/Sidebar.css";

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <button>
        <FontAwesomeIcon icon={faDownload} />
        Save
      </button>
    </nav>
  );
}
