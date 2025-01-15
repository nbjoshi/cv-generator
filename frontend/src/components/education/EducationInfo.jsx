import "../../styles/education/EducationInfo.css";

export default function EducationInfo({ info }) {
  const { schoolName, degree, location, startDate, endDate } = info;
  return (
    <div className="education-info">
      <div className="education-info-group">
        <p className="education-info-schoolName">
          {schoolName + " - " + location}
        </p>
        <p className="education-info-degree">{degree}</p>
      </div>
      <div className="education-info-group">
        <p className="dates">
          {startDate}
          {startDate && endDate && <span> – </span>}
          {endDate}
        </p>
      </div>
    </div>
  );
}
