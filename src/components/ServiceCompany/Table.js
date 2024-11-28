// Table.js
import React from "react";
import { EditIcon, DeleteIcon } from "../../assets/svgs";
import { MoreButton } from "../../UI/MoreButton/MoreButton";

const Table = ({
  data,
  th,
  mobile,
  mobileExpand,
  mobileExpandFunc,
  setEdit,
  deleteExpense,
  fillPopupDataHandler,
  setPopupShow,
}) => {
  // Function to create dropdown actions for each service company
  const getDropdownData = (item) => [
    // {
    //   id: 0,
    //   list: [
    //     {
    //       title: "More",
    //       onClick: () => {
    //         setPopupShow("More Info");
    //         fillPopupDataHandler(item);
    //       },
    //       svg: <InfoIcon />,
    //     },
    //   ],
    // },
    {
      id: 1,
      list: [
        {
          title: "Edit",
          onClick: () => {
            setEdit(true);
            setPopupShow("Edit Service Company");
            fillPopupDataHandler(item);
          },
          svg: <EditIcon />,
        },
      ],
    },
    {
      id: 1,
      list: [
        {
          title: "Delete",
          onClick: () => {
            deleteExpense(item);
          },
          svg: <DeleteIcon />,
        },
      ],
    },
  ];

  // Function to render each table cell
  const renderTableCell = (content, width, isMobileWidth) => (
    <div
      className={`td ${isMobileWidth ? "mobile-width" : ""}`}
      style={{ width: `${width}%` }}
    >
      <span>{content}</span>
    </div>
  );

  const tableData = data?.map((item, index) => (
    <div
      key={index}
      className={`table-parent ${mobileExpand === index ? "active" : ""}`}
    >
      <div className="table">
        {renderTableCell(
          item?.name || "N/A",
          mobile ? th[0].mobileWidth : th[0].width,
          th[0].mobileWidth
        )}
        {renderTableCell(
          item?.payment_method?.bank_name || "N/A",
          mobile ? th[1].mobileWidth : th[1].width,
          th[1].mobileWidth
        )}
        {renderTableCell(
          item?.payment_method?.account_number || "N/A",
          mobile ? th[2].mobileWidth : th[2].width,
          th[2].mobileWidth
        )}
        {renderTableCell(
          item?.service_type_id?.name || "N/A",
          mobile ? th[3].mobileWidth : th[3].width,
          th[3].mobileWidth
        )}
        <div
          className={`td ${th[4].mobileWidth ? "mobile-width" : ""}`}
          style={{ width: `${mobile ? th[4].mobileWidth : th[4].width}%` }}
        >
          <MoreButton dropdownData={getDropdownData(item)} />
        </div>
      </div>
    </div>
  ));

  return <>{tableData}</>;
};

export default Table;
