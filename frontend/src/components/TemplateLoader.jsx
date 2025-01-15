import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../styles/TemplateLoader.css";

export default function TemplateLoader({ onTemplateLoad, onClear }) {
  return (
    <div className="template-loader">
      <button onClick={onClear} className="clear-resume">
        <FontAwesomeIcon icon={faTrash} />
        Clear Resume
      </button>{" "}
      <button onClick={onTemplateLoad} className="load-example">
        Load Example
      </button>
    </div>
  );
}
