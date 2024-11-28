import { useState } from "react";
import ArrowDubble from "../../assets/svgs/ArrowDubble";
import CheckSvg from "../../assets/svgs/CheckSvg";

import "./Tabs.css";

export const Tabs = ({
  tabsData,
  type,
  customStyles,
  onClick,
  activeTab,
  setActiveTab,
  onTabClick,
  setMarkedServices,
}) => {
  const [toggle, setToggle] = useState(1);
  const [select, setSelect] = useState(false);

  let tabsHandler = (num) => {
    setToggle(num);
  };

  const handleTabClick = (index) => {
    if (onTabClick) {
      onTabClick(index);
    }
  };
  let tabs = null;

  if (type === "tabs") {
    tabs = (
      <div className={`${"tabs"}`} onClick={onClick}>
        <div
          onClick={() => {
            tabsHandler(1);
          }}
          className={`${"tab"}
              ${toggle === 1 ? "active-tab" : ""}`}
        >
          Position
        </div>
        <div
          onClick={() => {
            tabsHandler(2);
          }}
          className={`${"tab"}
              ${toggle === 2 ? "active-tab" : ""}`}
        >
          Orders <span>0</span>
        </div>
        <div
          onClick={() => {
            tabsHandler(3);
          }}
          className={`${"tab"}
              ${toggle === 3 ? "active-tab" : ""}`}
        >
          Fills <span>0</span>
        </div>
        <div
          onClick={() => {
            tabsHandler(4);
          }}
          className={`${"tab"}
              ${toggle === 4 ? "active-tab" : ""}`}
        >
          Payments <span>0</span>
        </div>
        <div className="expend-svg">
          <ArrowDubble />
        </div>
      </div>
    );
  }
  if (type === "two-component-tabs") {
    tabs = (
      <div className={`${"two-component-tabs"}`} onClick={onClick}>
        <div
          onClick={() => {
            tabsHandler(2);
          }}
          className={`${"two-component-tab"}
              ${toggle === 2 ? "active" : ""}`}
        >
          <span>0.93801</span>
          <span>Buy</span>
        </div>
        <div
          onClick={() => {
            tabsHandler(1);
          }}
          className={`${"two-component-tab"}
              ${toggle === 1 ? "active" : ""}`}
        >
          <span>0.93801</span>
          <span>Sell</span>
        </div>
      </div>
    );
  }
  if (type === "text-tabs") {
    tabs = (
      <div style={customStyles} className="text-tabs">
        {tabsData.map((item, index) => (
          <div
            key={index + item}
            onClick={() => {
              item.onClick && item.onClick(item.name);
            }}
            onMouseEnter={() => {
              !item.onClick && setSelect(item + index);
            }}
            onMouseLeave={() => {
              !item.onClick && setSelect(false);
            }}
            className={`text-tab ${
              (item.name === activeTab && !item.tabSelect) ||
              (item?.tabSelect &&
                item.tabSelect.some((obj) => obj.name === activeTab))
                ? "active-text-tab"
                : ""
            } ${item + index == select ? "active-select" : ""}`}
          >
            {item.tabSelect
              ? item.tabSelect.some((obj) => obj.name === activeTab)
                ? item.tabSelect.find((tab) => tab.name === activeTab).title
                : item.tabSelect[0].title
              : item.title}
            {item.tabSelect && (
              <>
                <CheckSvg
                  classNmae={`${"expend-i"} ${toggle === 3 ? "expend" : ""}`}
                />
                <div className="text-tab__tooltip">
                  {item.tabSelect.map((option, index) => {
                    return (
                      <div
                        className={`text-tab__tooltip-option ${
                          option.name == activeTab ? "active" : ""
                        }`}
                        key={index + option}
                        onClick={() => {
                          option.onClick(item.option);
                        }}
                      >
                        {option.title}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  }
  if (type === "button-variant") {
    tabs = (
      <div className={`${"button-variant"}`} onClick={onClick}>
        <p className="variant-title">Account</p>
        <div
          onClick={() => {
            tabsHandler(1);
          }}
          className={`${"variants-btn"}
              ${toggle === 1 ? "active-variant-btn" : ""}`}
        >
          Withdraw
        </div>
        <div
          onClick={() => {
            tabsHandler(2);
          }}
          className={`${"variants-btn"}
              ${toggle === 2 ? "active-variant-btn" : ""}`}
        >
          Deposit
        </div>
      </div>
    );
  }
  if (type === "simple") {
    tabs = (
      <div style={customStyles} className="tabs">
        {tabsData.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setActiveTab(item.name);
              setMarkedServices(item._id);
            }}
            className={`tab ${item.name === activeTab ? "active-tab" : ""}`}
          >
            {item.includes && (
              <CheckSvg styles={{ position: "absolute", right: "0" }} />
            )}
            {item.name}
          </div>
        ))}
      </div>
    );
  }

  if (type === "trade") {
    tabs = (
      <div style={customStyles} className="tradeTab">
        {tabsData?.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                handleTabClick(index);
                if (item.onClick) {
                  item.onClick();
                }
              }}
            >
              <div
                className={`tradeTab_item ${
                  index == activeTab ? "item_active" : ""
                }`}
                // onClick={() => setAccountType(item?.account_category)}
              >
                <span>{item.title}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return tabs;
};
