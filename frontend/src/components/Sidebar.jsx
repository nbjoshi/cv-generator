import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import "../styles/Sidebar.css";
import html2pdf from "html2pdf.js";

// Takes in the resumeRef prop so it can have access to the Resume container
// resumeRef specifies the DOM element to convert into a PDF
export default function Sidebar({ resumeRef }) {
  const handleDownload = () => {
    const resumeData = extractResumeData();
    console.log(resumeData);
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

  const handleSave = async () => {
    try {
      const resumeData = extractResumeData();
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:8000/save-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(resumeData),
      });

      if (!res.ok) {
        throw new Error("Failed to save resume");
      }

      const data = await res.json();
      alert(data);
    } catch (error) {
      console.error("Error saving resume:", error);
    }
  };

  const extractResumeData = () => {
    const personalInfo = {
      full_name:
        document.querySelector(".resume-name")?.textContent.trim() || "",
      email:
        document
          .querySelector(".contact-info div:nth-child(1)")
          ?.textContent.trim() || "",
      phone_number:
        document
          .querySelector(".contact-info div:nth-child(2)")
          ?.textContent.trim() || "",
      address:
        document
          .querySelector(".contact-info div:nth-child(3)")
          ?.textContent.trim() || "",
    };

    const education = Array.from(
      document.querySelectorAll(".education-info")
    ).map((section) => ({
      school_name:
        section
          .querySelector(".education-info-schoolName")
          ?.textContent.trim() || "",
      degree:
        section.querySelector(".education-info-degree")?.textContent.trim() ||
        "",
      start_date:
        section.querySelector(".dates")?.childNodes[0]?.textContent.trim() ||
        "",
      end_date:
        section.querySelector(".dates span:last-child")?.textContent.trim() ===
        "–"
          ? null
          : section
              .querySelector(".dates span:last-child")
              ?.textContent.trim() || null,
    }));

    const experiences = Array.from(
      document.querySelectorAll(".experience-info")
    ).map((section) => ({
      company_name:
        section
          .querySelector(".experience-info-companyName")
          ?.textContent.trim() || "",
      position_title:
        section
          .querySelector(".experience-info-positionTitle")
          ?.textContent.trim() || "",
      start_date:
        section.querySelector(".dates")?.childNodes[0]?.textContent.trim() ||
        "",
      end_date:
        section.querySelector(".dates span:last-child")?.textContent.trim() ===
        "–"
          ? null
          : section
              .querySelector(".dates span:last-child")
              ?.textContent.trim() || null,
      description:
        section
          .querySelector(".experience-info-description")
          ?.textContent.trim() || "",
    }));

    return {
      personal_info: personalInfo,
      education,
      experiences,
    };
  };

  return (
    <nav className="sidebar">
      <button onClick={handleDownload}>
        <FontAwesomeIcon icon={faDownload} />
        Download
      </button>
      <span className="divider"></span>
      <button onClick={handleSave}>
        <FontAwesomeIcon icon={faFloppyDisk} />
        Save
      </button>
    </nav>
  );
}
