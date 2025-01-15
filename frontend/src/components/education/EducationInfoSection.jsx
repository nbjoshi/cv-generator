import EducationInfo from "./EducationInfo";
import DisplaySection from "../DisplaySection";

export default function EducationInfoSection({ educations }) {
  return (
    <div className="education-info-section resume-section">
      <DisplaySection
        array={educations}
        InfoComponent={EducationInfo}
        title="Education"
      />
    </div>
  );
}
