import "../../styles/experience/ExperienceInfo.css";

export default function ExperienceInfo({ info }) {
  return (
    <div className="experience-info">
      <div className="experience-info-group">
        <p className="experience-info-companyName">
          {info.companyName + " - " + info.location}
        </p>
        <p className="experience-info-positionTitle">{info.positionTitle}</p>
        <p className="experience-info-description">{info.description}</p>
      </div>
      <div className="experience-info-group">
        <p className="dates">
          {info.startDate}
          {info.startDate && info.endDate && <span> – </span>}
          {info.endDate}
        </p>
      </div>
    </div>
  );
}
