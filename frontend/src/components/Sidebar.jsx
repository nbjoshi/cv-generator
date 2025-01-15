import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import "../styles/Sidebar.css";
import html2pdf from "html2pdf.js";

// Takes in the resumeRef prop so it can have access to the Resume container
// resumeRef specifies the DOM element to convert into a PDF
export default function Sidebar({ resumeRef }) {
  const handleSave = () => {
    if (resumeRef.current) {
      const options = {
        margin: 1,
        filename: "resume.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { format: "a4", orientation: "portrait" },
      };
      html2pdf().set(options).from(resumeRef.current).save();
    }
  };

  return (
    <nav className="sidebar">
      <button onClick={handleSave}>
        <FontAwesomeIcon icon={faDownload} />
        Save
      </button>
    </nav>
  );
}
