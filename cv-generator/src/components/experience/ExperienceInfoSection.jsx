import ExperienceInfo from "./ExperienceInfo";
import DisplaySection from "../DisplaySection";

export default function ExperienceInfoSection({ experiences }) {
  return (
    <div className="experience-info-section resume-section">
      <DisplaySection
        array={experiences}
        InfoComponent={ExperienceInfo}
        title="Professional Experience"
      />
    </div>
  );
}
