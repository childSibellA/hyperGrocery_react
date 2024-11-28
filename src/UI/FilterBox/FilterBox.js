import React, { useState } from "react";
import { Input } from "../Input/Input";
import FilterSvg from "../../assets/svgs/FilterSvg";
import { useTranslation } from "react-i18next";

import "./FilterBox.css";

export const FilterBox = ({
  searchLabel,
  tableFilterData,
  setTableFilterOutcomingData,
  tableFilterOutcomingData,
  tableHeader,
  tableSearchSelect,
  customStyles,
  searchInputValue,
}) => {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [headActive, setHeadActive] = useState(
    tableFilterOutcomingData?.selects?.statuses
  );
  const [searchInput, setSearchInput] = useState(searchInputValue);
  const { t } = useTranslation();

  const handleSelectChange = (option, name) => {
    setTableFilterOutcomingData((prev) => ({
      ...prev,
      selects: {
        ...prev.selects,
        [name]: option,
      },
    }));
  };

  const handleSearchChange = (e) => {
    if (tableSearchSelect) {
      setTableFilterOutcomingData((prev) => ({
        ...prev,
        search: {
          value: e.target.value,
          option: prev?.search?.option,
        },
      }));
    }
    if (!tableSearchSelect) {
      setTableFilterOutcomingData((prev) => ({
        ...prev,
        search: {
          value: e.target.value,
        },
      }));
    }
  };

  const handleSearchSelect = (option) => {
    setTableFilterOutcomingData((prev) => ({
      ...prev,
      search: {
        ...prev.search,
        option,
      },
    }));
  };

  const headerList = tableHeader && tableFilterData.selects[tableHeader];

  return (
    <div className={"filter-box-container"} style={customStyles}>
      <div className={`filter-box ${showSearchBox && "show-filters"}`}>
        {tableHeader && (
          <div className={"filter-box-list font-14"}>
            <div
              key={"all"}
              className={`filter-box-list__item ${
                headActive === "all" && "list-item__active"
              }`}
              onClick={() => {
                handleSelectChange("all", headerList.value);
                setHeadActive("all");
              }}
            >
              {t("all")}
            </div>
            {headerList.options.map((item) => (
              <div
                key={item.name}
                className={`filter-box-list__item ${
                  headActive === item.value && "list-item__active"
                }`}
                onClick={() => {
                  handleSelectChange(item.value, headerList.value);
                  setHeadActive(item.value);
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
        <button
          className={`advanced-search-btn ${
            showSearchBox && "search-btn-active"
          } font-14`}
          onClick={() => setShowSearchBox(!showSearchBox)}
        >
          <FilterSvg />
          {t("advancedSearch")}
        </button>
      </div>
      <div
        className={`filter-box-search-container ${
          showSearchBox && "filter-box-container-active"
        }`}
      >
        <div className={"filter-box-search"}>
          {!searchInput && (
            <div className={"filter-box-input"}>
              <Input
                type={"search-input"}
                label={searchLabel || "Search"}
                onChange={handleSearchChange}
                defaultData={tableFilterData.search.options}
                selectHandler={handleSearchSelect}
                placeholder={searchLabel || "Search"}
                selectLabel={"All"}
                select={tableSearchSelect}
              />
            </div>
          )}
          {tableFilterData.selects && (
            <div className={"filter-box-selects"}>
              {tableFilterData.selects
                .filter(
                  (select) => select.name !== headerList?.name && select.name
                )
                .map((select) => (
                  <Input
                    key={select.name}
                    type={"lable-input-select"}
                    icon={false}
                    label={select.name}
                    defaultData={select.options}
                    selectHandler={(opt) =>
                      handleSelectChange(opt, select.value)
                    }
                    selectLabel={`All ${select.name}`}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
