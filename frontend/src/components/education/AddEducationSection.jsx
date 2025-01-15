import DisplayForms from "../DisplayForms";
import ExpandSection from "../ExpandSection";
import CreateForm from "../CreateForm";
import EducationForm from "./EducationForm";
import "../../styles/Section.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

export default function AddEducationSection({
  educations,
  isOpen,
  onChange,
  createForm,
  setOpen,
  onCancel,
  toggleCollapsed,
  onHide,
  onRemove,
}) {
  return (
    <div className="add-education-section section">
      <ExpandSection
        isOpen={isOpen}
        setOpen={setOpen}
        sectionName="Education"
        icon={<FontAwesomeIcon icon={faGraduationCap} />}
      />

      <div className={`section-content ${isOpen ? "open" : ""}`}>
        <DisplayForms
          forms={educations}
          FormComponent={EducationForm}
          onChange={onChange}
          onCancel={onCancel}
          onHide={onHide}
          onRemove={onRemove}
          toggleCollapsed={toggleCollapsed}
          titleKey="schoolName"
          arrayName="educations"
        />

        <CreateForm onClick={createForm} buttonText="Education" />
      </div>
    </div>
  );
}
