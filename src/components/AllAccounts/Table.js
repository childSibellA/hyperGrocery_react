import React from "react";
import { MoreButton } from "../../UI/MoreButton/MoreButton";
import { EditIcon, DeleteIcon } from "../../assets/svgs";
import { useTranslation } from "react-i18next";

const Table = ({ td, th, mobile, mobileExpand, editUser, deleteUser }) => {
  const { t } = useTranslation();
  const getDropdownData = (user) => [
    {
      id: 0,
      list: [
        {
          title: t("moreButton.edit"),
          onClick: () =>
            editUser(user.email, user.roles, user.username, user._id),
          svg: <EditIcon />,
        },
        {
          title: t("moreButton.delete"),
          onClick: () => deleteUser(user._id),
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

  // Main table data mapping
  const tableData = td?.map((user, index) => (
    <div
      key={index}
      className={`table-parent ${mobileExpand === user._id ? "active" : ""}`}
    >
      <div className="table">
        {renderTableCell(
          user.email,
          mobile ? th[0].mobileWidth : th[0].width,
          th[0].mobileWidth
        )}
        {renderTableCell(
          user.username,
          mobile ? th[1].mobileWidth : th[1].width,
          th[1].mobileWidth
        )}
        {renderTableCell(
          user.roles[0],
          mobile ? th[2].mobileWidth : th[2].width,
          th[2].mobileWidth
        )}
        {renderTableCell(
          user._id,
          mobile ? th[3].mobileWidth : th[3].width,
          th[3].mobileWidth
        )}
        {renderTableCell(
          user.last_visit,
          mobile ? th[4].mobileWidth : th[4].width,
          th[4].mobileWidth
        )}
        <div
          className={`td ${th[5].mobileWidth ? "mobile-width" : ""}`}
          style={{ width: `${mobile ? th[5].mobileWidth : th[5].width}%` }}
        >
          <MoreButton dropdownData={getDropdownData(user)} />
        </div>
      </div>
    </div>
  ));

  return <>{tableData}</>;
};

export default Table;
