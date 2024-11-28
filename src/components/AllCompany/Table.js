import React from "react";
import { MoreButton } from "../../UI/MoreButton/MoreButton";
import StatusSelect from "../../UI/StatusSelect/StatusSelect";
import { EditIcon, DeleteIcon, InfoIcon } from "../../assets/svgs";
import { TimestampConverter } from "../../Utils/TimestampConverter";
import { useTranslation } from "react-i18next";

const CompaniesTable = ({
  companiesData,
  th,
  mobile,
  mobileExpand,
  deleteCompany,
  changeCompanyStatus,
  setPopupShow,
  setSelectedCompany, // Added prop
}) => {
  const { t } = useTranslation();

  const statuses = [
    { name: t("statuses.active"), value: "active" },
    { name: t("statuses.inactive"), value: "inactive" },
  ];

  const getDropdownData = (item) => [
    {
      id: 0,
      list: [
        {
          title: t("moreButton.details"),
          onClick: () => {
            setSelectedCompany(item); // Set the selected company data
            setPopupShow("Company Details"); // Open the popup for details
          },
          svg: <InfoIcon />,
        },
      ],
    },
    {
      id: 2,
      list: [
        {
          title: t("moreButton.edit"),
          onClick: () => {
            setPopupShow("Edit Company");
          },
          svg: <EditIcon />,
        },
      ],
    },
    {
      id: 3,
      list: [
        {
          title: t("moreButton.delete"),
          onClick: () => {
            deleteCompany(item._id);
          },
          svg: <DeleteIcon />,
        },
      ],
    },
  ];

  const renderTableCell = (content, width, isMobileWidth) => (
    <div
      className={`td ${isMobileWidth ? "mobile-width" : ""}`}
      style={{ width: `${width}%` }}
    >
      <span>{content}</span>
    </div>
  );

  return (
    <>
      {companiesData?.map((item, index) => (
        <div
          key={index}
          className={`table-parent ${mobileExpand === index ? "active" : ""}`}
        >
          <div className="table">
            {renderTableCell(
              item?.name,
              mobile ? th[0].mobileWidth : th[0].width,
              th[0].mobileWidth
            )}
            {renderTableCell(
              item?.email,
              mobile ? th[1].mobileWidth : th[1].width,
              th[1].mobileWidth
            )}
            {renderTableCell(
              `${item?.phone_number?.code} ${item?.phone_number?.number}`,
              mobile ? th[2].mobileWidth : th[2].width,
              th[2].mobileWidth
            )}
            {renderTableCell(
              TimestampConverter(item?.createdAt),
              mobile ? th[3].mobileWidth : th[3].width,
              th[3].mobileWidth
            )}
            <div
              className={`td ${th[4].mobileWidth ? "mobile-width" : ""}`}
              style={{ width: `${mobile ? th[4].mobileWidth : th[4].width}%` }}
            >
              <StatusSelect
                value={item.status}
                selectHandler={(e, id) =>
                  changeCompanyStatus(id, e.target.value)
                }
                itemId={item._id}
                statuses={statuses}
              />
            </div>
            <div
              className={`td ${th[5].mobileWidth ? "mobile-width" : ""}`}
              style={{ width: `${mobile ? th[5].mobileWidth : th[5].width}%` }}
            >
              <MoreButton dropdownData={getDropdownData(item)} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CompaniesTable;
