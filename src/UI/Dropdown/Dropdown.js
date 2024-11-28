import { Switches } from "../Switches/Switches";
import "./Dropdown.css";

export const Dropdown = ({
  type,
  customStyles,
  countryData,
  handlerClick,
  coutnryCode,
  dropdown,
  data,
  handleListItemClick,
  active,
  defaultOption,
  selectHandler,
  onChangeDropdown,
}) => {
  let element = "";

  if (type === "country") {
    element = (
      <div style={customStyles} className="dropdown-country">
        <h1 className="dropdown-toggle">Select Country</h1>
        {countryData?.map((item, index) => (
          <div key={index} className="dropdown-menu-country">
            <div
              onClick={() =>
                handlerClick({
                  flag: item.flag,
                  country: item.country,
                  code: item.code,
                })
              }
              className="dropdown-item-country"
            >
              <p>{item.flag}</p>
              <p>{item.country}</p>
              {coutnryCode && <p>{item.code}</p>}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "dropdown") {
    element = (
      <div style={customStyles} className={`active ${dropdown}`}>
        {data?.map((item, index) => (
          <div key={index}>
            <h1
              onClick={() => handlerClick(item.title)}
              className="dropdown-toggle"
            >
              {item.title}
            </h1>
            {item.list?.map((subItem, subIndex) => (
              <div
                key={subIndex}
                className="dropdown-item"
                onClick={() => {
                  subItem.onClick(subItem.title);
                }}
              >
                {subItem.svg}
                <div className="subitemTitleAndSwitch">
                  <p
                    id={subItem.id}
                    className={`${
                      active === `${subItem.id}` ? "left-line" : ""
                    } dropdown-item-color`}
                  >
                    {subItem.title}
                  </p>
                  {subItem.togle === true && (
                    <Switches
                      onChange={() => subItem.onClick}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (type === "default-dropdown") {
    element = (
      <div style={customStyles} className="active dropdown">
        {defaultOption && (
          <div
            className="dropdown-item"
            style={{ display: "none" }}
            onClick={() => {
              handlerClick(defaultOption);
              selectHandler("all");
            }}
            key={defaultOption}
          >
            {defaultOption}
          </div>
        )}
        {data?.map((item, index) => (
          <div
            className="dropdown-item"
            onClick={() => {
              handlerClick(item.name);
              selectHandler(item.value);
            }}
            key={index}
          >
            {item?.svg}
            {item.name}
          </div>
        ))}
      </div>
    );
  }

  if (type === "network-dropdown") {
    element = (
      <div style={customStyles} className="active dropdown">
        {data?.map((item, index) => (
          <div
            className="dropdown-item"
            onClick={() => {
              handlerClick(item.networkName);
              selectHandler({
                networkName: item.networkName,
                tokenStandard: item.tokenStandard,
              });
            }}
            key={index}
          >
            {item?.svg}
            {item.networkName}
          </div>
        ))}
      </div>
    );
  }

  if (type === "search-dropdown") {
    element = (
      <div style={customStyles} className="active dropdown">
        <input
          type="text"
          className="dropdown-search-input"
          onChange={onChangeDropdown}
        />
        {defaultOption && (
          <div
            className="dropdown-item"
            onClick={() => {
              handlerClick(defaultOption);
              selectHandler("all");
            }}
            key={defaultOption}
          >
            {defaultOption}
          </div>
        )}
        {data?.map((item, index) => (
          <div
            className="dropdown-item"
            onClick={() => {
              handlerClick(item.name);
              selectHandler(item.value);
            }}
            key={index}
          >
            {item.name}
          </div>
        ))}
      </div>
    );
  }

  if (type === "simple-drowpdown") {
    element = (
      <div className="dropdown" style={customStyles}>
        {data?.map((item, index) => (
          <div
            onClick={() => handlerClick({ name: item.name, img: item.img })}
            className="dropdown-item"
            key={index}
          >
            <span>{item.img}</span>
            {item.name}
          </div>
        ))}
      </div>
    );
  }

  return element;
};
