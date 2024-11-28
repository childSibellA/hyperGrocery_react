import "./Switches.css";

export const Switches = ({
  size,
  type,
  value,
  onChange,
  customStyles,
  content,
  label,
}) => {
  return (
    <>
      <p className={`font-12`}>{label}</p>
      <div className={`form-switch ${size} ${type}`} style={customStyles}>
        <input type="checkbox" checked={value} onChange={onChange} />
        <div className="check">
          <i className="content">{content}</i>
        </div>
      </div>
    </>
  );
};
