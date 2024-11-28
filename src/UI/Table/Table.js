import { useMobileWidth } from "../../hooks/useMobileWidth";
import { NoApplicationsIcon } from "../../assets/svgs";
// import translates from "../../locales/en/translates.json";
import "./Table.css";

export const Table = ({
  type,
  tableHead,
  tableData,
  handleViewAll,
  tableEmptyData,
  loading,
  customStyles,
  tableHeadMore,
  customHeadStyles,
  customTableMoreStyles,
  customThStyles,
  tableFooter,
  tableEmulator,
}) => {
  const { mobile } = useMobileWidth();

  return (
    <div className={`${type}`} style={customStyles} id={"table-version"}>
      {tableHeadMore}
      {tableData && !tableEmulator && (
        <>
          {tableHead && (
            <div className="table-head" style={customHeadStyles}>
              {tableHead?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`th ${item.mobileWidth ? true : false} ${
                      item?.className
                    }`}
                    style={{
                      width: `${mobile ? item.mobileWidth : item.width}%`,
                      height: `${item.height}`,
                      ...customThStyles,
                    }}
                  >
                    {item?.name}
                    {item?.icon}
                  </div>
                );
              })}
            </div>
          )}
          <div className="table-more" style={customTableMoreStyles}></div>
          <div className="icon-place" style={customTableMoreStyles}></div>
          {loading ? (
            <div className="table-loading-container">
              <div className="table-loading" />
            </div>
          ) : (
            tableData
          )}
          {tableFooter}
        </>
      )}
      {(!tableData || tableData.length === 0) && !tableEmulator && (
        <div className="table-empty">
          <>
            {tableEmptyData?.icon ? (
              tableEmptyData?.icon
            ) : (
              <NoApplicationsIcon />
            )}
            <p
              className="font-14"
              style={{ color: "rgba(255, 255, 255, 0.6)" }}
            >
              {/* {tableEmptyData?.label || translates.no_data_available.en} */}
            </p>
            {handleViewAll && (
              <p
                className="table-empty__view-all font-14"
                onClick={handleViewAll}
              >
                {/* {translates.view_all_transactions.en} */}
              </p>
            )}
          </>
        </div>
      )}
      {tableEmulator !== false ? (
        <div className="table-emulator-container">{tableEmulator}</div>
      ) : (
        ""
      )}
    </div>
  );
};
