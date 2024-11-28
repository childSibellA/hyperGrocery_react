import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import { parseISO, formatISO } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

import { Dropdown } from "../Dropdown/Dropdown";
import { Switches } from "../Switches/Switches";
import { countriesData } from "./helper";

// hooks
import { useOnOutsideClick } from "../../hooks/useOnOutsideClick";
import ShowSvg from "./svg/ShowSvg";
import HideSvg from "./svg/HideSvg";
import EditSvg from "./svg/EditSvg";
import ArrowDown from "./svg/ArrowDown";
import Xsvg from "./svg/Xsvg";
import UploadSvg from "./svg/UploadSvg";
import SearchSvg from "./svg/SearchSvg";
import DashSvg from "./svg/DashSvg";
import PlusSvg from "./svg/PlusSvg";

import "react-datepicker/dist/react-datepicker.css";
import "./Input.css";

export const Input = ({
  type,
  value: propValue,
  selectLabel,
  name,
  customStyles,
  className,
  label,
  subLabel,
  icon,
  emptyFieldErr,
  editable,
  inputClassName,
  disabled,
  inputType,
  placeholder,
  autoComplete,
  onChange,
  svg,
  selectPosition,
  selectType,
  defaultData,
  selectHandler,
  onClick,
  select,
  statusCard,
  toggle,
  toggleTitle,
  inputFrame,
  btns,
  active: propActive,
  incriment,
  decriment,
  min,
  max,
  step,
  cols,
  rows,
  readOnly,
  autoFocus,
  maxLength,
  wrap,
  resize,
  multiplyData,
  handleItemRemove,
  onChangeDropdown,
  arrayTitle,
  valueArray,
  handleAddValue,
  handleDeleteValue,
  uploadContent,
  elementIndex,
  required,
}) => {
  const [file, setFile] = useState(propValue || "");
  const [active, setActive] = useState(false);
  const [cover, setCover] = useState(false);
  const [value, setValue] = useState(selectLabel || "");
  const [edit, setEdit] = useState(false);

  const [mobileData, setMobileData] = useState({
    code: "+995",
    flag: "🇬🇪",
    number: "",
  });

  const editHandler = () => {
    setEdit(true);
  };

  const activeHandler = () => {
    setActive((prev) => !prev);
  };

  const coverHandler = () => {
    setCover((prev) => !prev);
  };

  const deleteHandler = () => {
    setFile(null);
    onChange("");
  };

  function handlerClick(i) {
    setValue(i);
    setActive(false);
  }

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    onChange(e.target.files[0]);
  }

  function handleMobileSelect(data) {
    setActive(false);
    onChange({ ...mobileData, flag: data.flag, code: data.code });
    setMobileData((prev) => ({ ...prev, flag: data.flag, code: data.code }));
  }

  useEffect(() => {
    if (type === "label-input-phone-number" && propValue) {
      setMobileData(propValue);
    }
    setValue(propValue);
  }, [propValue, type]);

  const ref = useRef();
  useOnOutsideClick(ref, () => setActive(false));

  let element = null;

  //default
  if (type === "default") {
    element = (
      <div style={customStyles} className={`${className} input-group`}>
        {(label || subLabel) && (
          <p className="input-group-title font-12">
            {label}
            {required && <span style={{ color: "red" }}>*</span>}
            <span className="font-12">{subLabel}</span>
          </p>
        )}
        <input
          onChange={(e) => {
            setEdit(true);
            onChange(e);
          }}
          value={propValue}
          name={name}
          autoComplete={autoComplete}
          style={
            icon
              ? { paddingRight: "43px", ...customStyles }
              : { paddingRight: "16px", ...customStyles }
          }
          className={`form-control ${emptyFieldErr ? "error-border" : ""} ${
            !edit && editable && propValue?.length > 0 ? "disabled-input" : ""
          } ${disabled ? "disabled-input" : ""} ${
            inputClassName ? inputClassName : ""
          }`}
          type={!cover && inputType === "password" ? "password" : "text"}
          placeholder={placeholder}
        />
        <span>
          {inputType === "password" ? (
            <div onClick={coverHandler}>
              {cover ? (
                <ShowSvg label={label} subLabel={subLabel} />
              ) : (
                <HideSvg label={label} subLabel={subLabel} />
              )}
            </div>
          ) : (
            ""
          )}
          {editable && !edit && propValue?.length > 0 ? (
            <EditSvg editHandler={editHandler} type={type} />
          ) : (
            ""
          )}
        </span>
        {statusCard}
      </div>
    );
  }

  //numebr
  if (type === "number") {
    element = (
      <div style={customStyles} className={`${className} input-group`}>
        {(label || subLabel) && (
          <p className="input-group-title font-12">
            {label}
            {required && <span style={{ color: "red" }}>*</span>}
            <span className="font-12">{subLabel}</span>
          </p>
        )}
        <input
          onChange={(e) => {
            setEdit(true);
            onChange(e);
          }}
          value={propValue}
          name={name}
          style={
            icon
              ? { paddingRight: "43px", ...customStyles }
              : { paddingRight: "16px", ...customStyles }
          }
          className={`form-control ${emptyFieldErr ? "error-border" : ""} ${
            !edit && editable && propValue?.length > 0 ? "disabled-input" : ""
          } ${inputClassName ? inputClassName : ""}`}
          type={!cover && inputType === "password" ? "password" : inputType}
          placeholder={placeholder}
        />
        {editable && !edit && propValue?.length > 0 ? (
          <EditSvg editHandler={editHandler} type={type} />
        ) : (
          ""
        )}
        {statusCard}
      </div>
    );
  }

  // Label Input Select
  if (type === "lable-input-select") {
    element = (
      <div style={customStyles} className="select-group">
        <p className="input-group-title font-12">
          {label}
          {required && <span style={{ color: "red" }}>*</span>}
        </p>
        <div
          ref={ref}
          onChange={(e) => {
            setEdit(true);
            onChange(e);
          }}
          className="form-select-sc relative"
        >
          <div
            onClick={activeHandler}
            style={customStyles}
            className={`form-select-item form-control ${
              emptyFieldErr ? "error-border" : ""
            } ${
              !edit && editable && propValue?.length > 0 ? "disabled-input" : ""
            } ${disabled ? "disabled-input" : ""}`}
          >
            <div className="flag-wrapper">
              {value ? (
                <>
                  {svg} {value}
                </>
              ) : (
                selectLabel
              )}
            </div>
            <ArrowDown
              active={active}
              value={value}
              edit={edit}
              editable={editable}
            />
          </div>
          <div
            className={`hidden ${active ? "select-modal-sc" : ""} ${
              selectPosition === "top" ? "select-position-top" : ""
            }`}
          >
            {selectType === "network" ? (
              <Dropdown
                type={"network-dropdown"}
                data={defaultData}
                active={propActive}
                handlerClick={handlerClick}
                selectHandler={selectHandler}
                customStyles={{ width: "inherit" }}
              />
            ) : selectType === "country" ? (
              <Dropdown
                type={"country"}
                handlerClick={(data) => {
                  setActive(false);
                  setValue(`${data.flag} ${data.country}`);
                  setEdit(true);
                  onClick(`${data.flag} ${data.country}`);
                }}
                countryData={countriesData}
                dropdownCountry={"dropdown-country"}
                active={propActive}
                customStyles={{ width: "inherit" }}
              />
            ) : (
              <Dropdown
                type={"default-dropdown"}
                data={defaultData}
                active={propActive}
                handlerClick={handlerClick}
                selectHandler={selectHandler}
                customStyles={{ width: "inherit" }}
                defaultOption={selectLabel}
              />
            )}
          </div>
          {editable && !edit && propValue?.length > 0 ? (
            <EditSvg editHandler={editHandler} type={type} />
          ) : (
            ""
          )}
        </div>
        {statusCard}
      </div>
    );
  }

  // Label Input Phone Number
  if (type === "label-input-phone-number") {
    element = (
      <div
        style={customStyles}
        className="input-group-item phone-numbers relative"
      >
        <p className="input-group-title font-12">
          {label}
          {required && <span style={{ color: "red" }}>*</span>}
        </p>
        <div
          className={`form-control select-control ${emptyFieldErr ? "error-border" : ""} ${
            !edit && editable && propValue?.number?.length > 0
              ? "disabled-input"
              : ""
          }`}
        >
          <div onClick={activeHandler} className="select-prefix">
            <div className="flag">{mobileData.flag}</div>
            <ArrowDown active={active} />
          </div>
          <span className="select-body">{mobileData.code}</span>
          <div className="select-sufix">
            <input
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/[^\d\s]/g, "");
                onChange({ ...mobileData, number: onlyNumbers });
                setMobileData((prev) => ({ ...prev, number: onlyNumbers }));
              }}
              value={mobileData.number}
              className={`number-control ${emptyFieldErr ? "error-border" : ""}`}
              type="text"
            />
          </div>
        </div>
        {editable && !edit && propValue?.number?.length > 0 ? (
          <EditSvg editHandler={editHandler} type={type} />
        ) : (
          ""
        )}
        <div className={`hidden ${active ? "phone-number-active" : ""}`}>
          <Dropdown
            type={"country"}
            handlerClick={handleMobileSelect}
            countryData={countriesData}
            dropdownCountry={"dropdown-country"}
            active={propActive}
            customStyles={{ width: "inherit" }}
            countryCode={true}
          />
        </div>
        {statusCard}
      </div>
    );
  }

  // Label Input Type 1
  if (type === "lable-input-type1") {
    element = (
      <div style={customStyles} className="input-group-item">
        <div className="input-group-text-sc">
          <p className="font-12 input-group-title">
            {label}
            <span>{subLabel}</span>
          </p>
          {toggle && (
            <div className="input-toggle">
              <p className="font-12">{toggleTitle}</p>
              <div>
                <Switches type={"sm-switches"} />
              </div>
            </div>
          )}
        </div>
        <div className="input-form">
          <div className="input-form-inner">
            <input
              onChange={(e) => {
                setEdit(true);
                onChange(e);
              }}
              style={icon ? { paddingRight: "55px" } : { paddingRight: "16px" }}
              className={`form-control ${emptyFieldErr ? "error-border" : ""}`}
              type="text"
              placeholder={placeholder}
            />
            <div className="input-group-frame">{inputFrame}</div>
          </div>
          {!btns ? null : (
            <div className="input-form-frame-outer">
              {btns.map((item) => (
                <div
                  onClick={onClick}
                  className="input-form-frame"
                  key={item.id}
                >
                  {item.value}
                </div>
              ))}
            </div>
          )}
        </div>
        {statusCard}
      </div>
    );
  }

  // Label Input Type 2
  if (type === "lable-input-type2") {
    element = (
      <div style={customStyles} className="input-group-item">
        <p className="font-12 input-group-text">
          {subLabel}
          <span className="input-group-frame-secondary">{subLabel}</span>
        </p>
        <input
          onChange={(e) => {
            setEdit(true);
            onChange(e);
          }}
          style={icon ? { paddingRight: "43px" } : { paddingRight: "16px" }}
          className={`form-control ${emptyFieldErr ? "error-border" : ""}`}
          type="text"
          placeholder={placeholder}
        />
        {statusCard}
      </div>
    );
  }

  // Label Input Multi Select
  if (type === "lable-input-multi-select") {
    element = (
      <div style={customStyles} className="select-group">
        <p className="input-group-title font-12">{label}</p>
        <div ref={ref} className="form-select-sc relative">
          <div
            className={`form-select-item form-control form-multiply ${emptyFieldErr ? "error-border" : ""} ${
              !edit && editable && propValue?.length > 0 ? "disabled-input" : ""
            }`}
          >
            <div
              className="form-multiply-clicker"
              onClick={activeHandler}
            ></div>
            <div className="flag-wrapper">
              {multiplyData.map((item, index) => (
                <div className="multiply-select-item" key={index}>
                  {item}
                  <div
                    className="close-multiply-select-item"
                    onClick={() => handleItemRemove(item)}
                  >
                    <Xsvg />
                  </div>
                </div>
              ))}
            </div>
            <ArrowDown
              active={active}
              value={value}
              edit={edit}
              editable={editable}
              onClick={activeHandler}
            />
          </div>
          <div
            className={`hidden ${active ? "select-modal-sc" : ""} ${selectPosition === "top" ? "select-position-top" : ""}`}
          >
            <Dropdown
              type={"search-dropdown"}
              data={defaultData}
              active={propActive}
              handlerClick={handlerClick}
              selectHandler={selectHandler}
              customStyles={{ width: "inherit" }}
              defaultOption={selectLabel}
              onChangeDropdown={(e) => onChangeDropdown(e.target.value)}
            />
          </div>
        </div>
        {statusCard}
      </div>
    );
  }

  // Label Input Upload
  if (type === "label-input-upload") {
    element = (
      <div style={customStyles} className="upload-group">
        <div className="upload-group-title">
          {/* <p className="font-12">Upload Image</p> */}
          <p>{uploadContent}</p>
          <p onClick={deleteHandler} className="delete-btn font-12">
            Delete avatar
          </p>
        </div>
        <div
          className={`upload-group-inner ${emptyFieldErr ? "error-border" : ""}`}
        >
          <div className="upload-group-placeholder">
            {!file ? (
              <UploadSvg />
            ) : (
              <img
                className={"avatar-sm"}
                src={file}
                onError={() => {
                  setFile(null);
                }}
              />
            )}
          </div>
          <div className="upload-group-text">
            <label className="upload-btn" htmlFor={"upload_img"}>
              Browse
            </label>
            <input
              id={`upload_img ${elementIndex}`}
              className={`upload-control ${emptyFieldErr ? "error-border" : ""}`}
              type="file"
              onChange={handleChange}
            />
          </div>
        </div>
        {statusCard}
      </div>
    );
  }

  // Search Input
  if (type === "search-input") {
    element = (
      <div style={customStyles} className="input-group" ref={ref}>
        <p className="font-12">{label}</p>
        <div className="search-input form-control">
          <div className="search-input-item-fr">
            <SearchSvg />
          </div>
          <input
            onChange={(e) => {
              setEdit(true);
              onChange(e);
            }}
            className="search-control"
            type="search"
            placeholder={placeholder}
          />
          {select && (
            <div className="form-select search-input-item">
              <div onClick={activeHandler} className="select-form">
                <p className="font-10">{value || selectLabel}</p>
                <ArrowDown active={active} />
              </div>
              <div className={`hidden ${active ? "select-modal" : ""}`}>
                <Dropdown
                  type={"default-dropdown"}
                  data={defaultData}
                  active={propActive}
                  handlerClick={handlerClick}
                  selectHandler={selectHandler}
                  customStyles={{}}
                  defaultOption={selectLabel}
                />
              </div>
            </div>
          )}
        </div>
        {statusCard}
      </div>
    );
  }

  // Date Picker Input
  if (type === "date-picker-input") {
    element = (
      <div
        style={customStyles}
        className={`input-group ${emptyFieldErr ? "error-border" : ""} relative`}
      >
        <p className="font-12">{label}</p>
        <DatePicker
          className={`form-control ${!edit && editable ? "disabled-input" : ""}`}
          selected={propValue ? parseISO(propValue) : null}
          onChange={(date) => onChange(date ? formatISO(date) : "")}
          placeholderText="MM/DD/YYYY"
          customInput={
            <input
              value={propValue}
              style={customStyles}
              placeholder="MM/DD/YYYY"
              readOnly
            />
          }
        />
        {statusCard}
        {editable && <EditSvg editHandler={editHandler} edit={edit} />}
      </div>
    );
  }

  // Textarea
  if (type === "textarea") {
    element = (
      <div className="textarea-input-container">
        <div className="textarea-input-header">
          {icon}
          <p className="font-12">{label}</p>
        </div>
        <textarea
          name={name}
          rows={rows}
          cols={cols}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          value={propValue}
          onChange={onChange}
          autoFocus={autoFocus}
          maxLength={maxLength}
          wrap={wrap}
          resize={resize}
          className={`textarea-input ${emptyFieldErr ? "error-border" : ""}`}
          style={customStyles}
        />
        {statusCard}
      </div>
    );
  }

  // Range Input
  if (type === "range") {
    element = (
      <div style={customStyles} className={`${className} input-group`}>
        <input
          onChange={(e) => onChange(e)}
          value={propValue}
          name={name}
          min={min}
          max={max}
          step={step}
          className={`input-range ${disabled ? "disabled-range" : ""}`}
          type="range"
          placeholder={placeholder}
        />
        <div className="range-ttls">
          <div>
            {min.toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}{" "}
            $
          </div>
          <div>
            {max.toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}{" "}
            $
          </div>
        </div>
      </div>
    );
  }

  // Staking Amount
  if (type === "staking_amount") {
    element = (
      <div className="input-group custom-arrow">
        <p className="font-12">{label}</p>
        <input
          onChange={(e) => onChange(e)}
          value={propValue}
          name={name}
          min={min}
          max={max}
          step={step}
          style={customStyles}
          type="number"
          placeholder={placeholder}
        />
        <div onClick={decriment} className="custom-arrow-up opacity-1">
          <ArrowDown />
        </div>
        <div onClick={incriment} className="custom-arrow-down opacity-1">
          <ArrowDown />
        </div>
      </div>
    );
  }

  // Plus Minus
  if (type === "plus_minus") {
    element = (
      <div
        className="input-group input__plus-minus custom-arrow"
        style={customStyles}
      >
        <p className="font-12">{label}</p>
        <input
          onChange={(e) => onChange(e)}
          value={propValue}
          name={name}
          min={min}
          max={max}
          step={step}
          type="number"
          placeholder={placeholder}
          className="form-control"
        />
        <div className="input-input__plus-minus-btns">
          <DashSvg decriment={decriment} />
          <PlusSvg incriment={incriment} />
        </div>
      </div>
    );
  }

  // Checkbox
  if (type === "checkbox") {
    element = (
      <div className={`checkbox-input-container ${className}`}>
        <label htmlFor={name} className="checkbox-label">
          <input
            id={name}
            onChange={onChange}
            checked={propValue}
            name={name}
            className={`input-checkbox ${disabled ? "disabled-checkbox" : ""}`}
            type="checkbox"
          />
          <span className="custom-checkbox"></span>
          {label}
        </label>
      </div>
    );
  }

  if (type === "input-with-button") {
    element = (
      <div
        style={customStyles}
        className="input-with-button-container"
        ref={ref}
      >
        {(label || subLabel) && (
          <p className="input-group-title font-12">
            {label}
            <span className="font-12">{subLabel}</span>
          </p>
        )}
        <div
          className="input-group"
          style={{ display: "flex", alignItems: "center" }}
        >
          <input
            type="text"
            value={propValue}
            onChange={onChange}
            placeholder={placeholder || "Enter a value"}
            className={`form-control ${emptyFieldErr ? "error-border" : ""}`}
            style={{ flex: 1, paddingRight: "16px", ...customStyles }}
          />
          <button onClick={handleAddValue} className="button-in-input">
            <PlusSvg />
            Add
          </button>
        </div>
        {statusCard}
        {valueArray?.length > 0 && (
          <div className="valuesContainer">
            <h4>{arrayTitle}</h4>
            <ul>
              {valueArray.map((value, index) => (
                <li key={index} className="value-item">
                  {value}
                  <button
                    onClick={() => handleDeleteValue(index)}
                    className="delete-button"
                  >
                    <Xsvg />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return element;
};
