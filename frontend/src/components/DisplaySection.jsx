import "../styles/DisplaySection.css";

export default function DisplaySection({ array, InfoComponent, title }) {
  const hasVisibleContent = !array.every((obj) => obj.isHidden);

  return (
    <>
      {hasVisibleContent && <h3 className="header-text">{title}</h3>}
      {hasVisibleContent && <span className="divider"></span>}
      {array.map(
        (info) => !info.isHidden && <InfoComponent info={info} key={info.id} />
      )}
    </>
  );
}
