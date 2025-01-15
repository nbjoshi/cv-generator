import PersonalInfoSection from "./personal/PersonalInfoSection";
import EducationInfoSection from "./education/EducationInfoSection";
import ExperienceInfoSection from "./experience/ExperienceInfoSection";
import "../styles/Resume.css";
import { forwardRef } from "react";

const Resume = forwardRef(({ personalInfo, sections, layout }, ref) => {
  return (
    <div className="resume-container" ref={ref}>
      <div className={`resume ${layout}`}>
        <PersonalInfoSection
          fullName={personalInfo.fullName}
          email={personalInfo.email}
          phoneNumber={personalInfo.phoneNumber}
          address={personalInfo.address}
        />
        <div>
          <EducationInfoSection educations={sections.educations} />
          <ExperienceInfoSection experiences={sections.experiences} />
        </div>
      </div>
    </div>
  );
});

export default Resume;
