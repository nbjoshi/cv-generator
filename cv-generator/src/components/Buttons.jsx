import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Buttons({ cancel, save, remove }) {
  return (
    <div className="buttons">
      <button className="delete" onClick={remove} type="button">
        <FontAwesomeIcon icon={faTrash} /> Delete
      </button>
      <div className="main-buttons">
        <button className="cancel" onClick={cancel} type="button">
          Cancel
        </button>
        <button className="save" onClick={save} type="submit">
          Save
        </button>
      </div>
    </div>
  );
}
