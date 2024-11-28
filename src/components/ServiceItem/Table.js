import React from "react";
import { MoreButton } from "../../UI/MoreButton/MoreButton";
import { EditIcon, DeleteIcon } from "../../assets/svgs";
import { TimestampConverter } from "../../Utils/TimestampConverter";
import { useTranslation } from "react-i18next";
import InfoIcon from "../../assets/svgs/InfoIcon";
import StatusSelect from "../../UI/StatusSelect/StatusSelect";
import ReminderSvg from "../../assets/svgs/ReminderSvg";

const ServiceItemsTable = ({
  data,
  th,
  mobile,
  mobileExpand,
  setEdit,
  setPopupShow,
  fillPopupDataHandler,
  deleteHandler,
  setSelectedService,
  changeServiceStatus,
}) => {
  const { t } = useTranslation();

  const getDropdownData = (item) => [
    {
      id: 0,
      list: [
        {
          title: t("moreButton.details"),
          onClick: () => {
            setPopupShow("More Info");
            setSelectedService(item);
          },
          svg: <InfoIcon />,
        },
      ],
    },
    {
      id: 1,
      list: [
        {
          title: t("moreButton.edit"),
          onClick: () => {
            fillPopupDataHandler(item);
            setPopupShow("Edit Service");
            setEdit(true);
          },
          svg: <EditIcon />,
        },
      ],
    },
    {
      id: 2,
      list: [
        {
          title: t("moreButton.delete"),
          onClick: () => {
            deleteHandler(item);
          },
          svg: <DeleteIcon />,
        },
      ],
    },
  ];

  let statuses = [
    { name: t("statuses.approved"), value: "approved" },
    { name: t("statuses.pending"), value: "pending" },
    { name: t("statuses.canceled"), value: "canceled" },
  ];

  console.log(data, "data");

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
      {data?.map((item, index) => (
        <div
          key={index}
          className={`table-parent ${mobileExpand === index ? "active" : ""}`}
          onClick={() => {
            setPopupShow("More Info");
            setSelectedService(item);
          }}
        >
          <div className="table">
            <div
              className={`td ${th[0].mobileWidth ? "mobile-width" : ""}`}
              style={{ width: `${mobile ? th[0].mobileWidth : th[0].width}%` }}
            >
              {item?.service_type_id?.name}
              {item.reminder_needed && <ReminderSvg />}
            </div>
            {renderTableCell(
              item?.start_date && TimestampConverter(item?.end_date, true),
              mobile ? th[1].mobileWidth : th[1].width,
              th[1].mobileWidth
            )}
            {renderTableCell(
              `${item?.location} - ${item?.destination}`,
              mobile ? th[2].mobileWidth : th[2].width,
              th[2].mobileWidth
            )}
            {renderTableCell(
              item?.amount,
              mobile ? th[3].mobileWidth : th[3].width,
              th[3].mobileWidth
            )}
            <div
              className={`td ${th[4].mobileWidth ? "mobile-width" : ""}`}
              style={{ width: `${mobile ? th[4].mobileWidth : th[4].width}%` }}
              onClick={(e) => e.stopPropagation()}
            >
              <StatusSelect
                value={item.performance_status}
                selectHandler={(e) =>
                  changeServiceStatus(item._id, e.target.value)
                }
                itemId={item._id}
                statuses={statuses}
              />
            </div>
            <div
              className={`td ${th[5].mobileWidth ? "mobile-width" : ""} ${item?.status}`}
              style={{ width: `${mobile ? th[5].mobileWidth : th[5].width}%` }}
            >
              {item?.status}
            </div>
            {renderTableCell(
              item?.service_company_id?.name,
              mobile ? th[6].mobileWidth : th[6].width,
              th[6].mobileWidth
            )}
            {renderTableCell(
              item?.customer_id?.full_name,
              mobile ? th[7].mobileWidth : th[7].width,
              th[7].mobileWidth
            )}
            {renderTableCell(
              item?.customer_id?.phone_number.number,
              mobile ? th[8].mobileWidth : th[8].width,
              th[8].mobileWidth
            )}
            <div
              className={`td ${th[9].mobileWidth ? "mobile-width" : ""}`}
              style={{ width: `${mobile ? th[9].mobileWidth : th[9].width}%` }}
              onClick={(e) => e.stopPropagation()}
            >
              <MoreButton dropdownData={getDropdownData(item)} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ServiceItemsTable;
