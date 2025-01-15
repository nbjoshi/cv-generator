import ExpandSection from "../ExpandSection";
import CreateForm from "../CreateForm";
import DisplayForms from "../DisplayForms";
import ExperienceForm from "./ExperienceForm";
import "../../styles/Section.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

export default function AddExperienceSection({
  isOpen,
  createForm,
  setOpen,
  experiences,
  onChange,
  onCancel,
  toggleCollapsed,
  onHide,
  onRemove,
}) {
  return (
    <div className="add-experience-section section">
      <ExpandSection
        isOpen={isOpen}
        setOpen={setOpen}
        sectionName="Experience"
        icon={<FontAwesomeIcon icon={faBriefcase} />}
      />

      <div className={`section-content ${isOpen ? "open" : ""}`}>
        <DisplayForms
          forms={experiences}
          onChange={onChange}
          onCancel={onCancel}
          toggleCollapsed={toggleCollapsed}
          onHide={onHide}
          onRemove={onRemove}
          FormComponent={ExperienceForm}
          titleKey="companyName"
          arrayName="experiences"
        />

        <CreateForm onClick={createForm} buttonText="Experience" />
      </div>
    </div>
  );
}
