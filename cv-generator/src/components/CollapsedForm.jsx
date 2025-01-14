import "../styles/CollapsedForm.css";

export default function CollapsedForm(props) {
  const { onClick, hideForm, title, arrayName } = props;
  const { isHidden, id } = props.form;
  return (
    <button
      className="collapsed-form section-form"
      id={id}
      onClick={onClick}
      data-array-name={arrayName}
    >
      <p className="collapsed-form-title">{title}</p>
    </button>
  );
}
