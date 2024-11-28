import React from "react";
import { MoreButton } from "../../UI/MoreButton/MoreButton";
import StatusSelect from "../../UI/StatusSelect/StatusSelect";
import { EditIcon, DeleteIcon, InfoIcon } from "../../assets/svgs";
import { TimestampConverter } from "../../Utils/TimestampConverter";
import { useTranslation } from "react-i18next";
import OrderSvg from "../../assets/svgs/OrderSvg";
import { Switches } from "../../UI/Switches/Switches";

const CustomersTable = ({
  customersData,
  th,
  mobile,
  mobileExpand,
  fillPopupDataHendler,
  deleteCustomer,
  changeCustomerStatus,
  setEdit,
  setPopupShow,
  setPopUpData,
  toggleCustomerBotStatus,
}) => {
  const { t } = useTranslation();

  const handleBotToggle = (customer) => {
    toggleCustomerBotStatus(customer._id, !customer.bot_suspended);
  };

  let statuses = [
    { name: t("statuses.approved"), value: "approved" },
    { name: t("statuses.pending"), value: "pending" },
    { name: t("statuses.canceled"), value: "canceled" },
  ];
  const getDropdownData = (item) => [
    {
      id: 0,
      list: [
        {
          title: t("moreButton.details"),
          onClick: () => {
            fillPopupDataHendler(item);
            setPopupShow("Customer Details");
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
            fillPopupDataHendler(item);
            setPopupShow("Edit Customer");
            setEdit(true);
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
            deleteCustomer(item._id);
          },
          svg: <DeleteIcon />,
        },
      ],
    },
    {
      id: 3,
      list: [
        {
          title: t("addOrder"),
          onClick: () => {
            setPopupShow("Make Order");
            setPopUpData((prev) => ({
              ...prev,
              customer_id: item._id,
              full_name: item.full_name,
              phone_number: item.phone_number,
              national_ID_number: item.national_ID_number,
            }));
          },
          svg: <OrderSvg />,
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
      {customersData?.map((item, index) => (
        <div
          key={index}
          className={`table-parent ${mobileExpand === index ? "active" : ""}`}
          onClick={() => {
            fillPopupDataHendler(item);
            setPopupShow("Customer Details");
          }}
        >
          <div className="table">
            {renderTableCell(
              item?.full_name,
              mobile ? th[0].mobileWidth : th[0].width,
              th[0].mobileWidth
            )}
            {renderTableCell(
              item?.gender,
              mobile ? th[1].mobileWidth : th[1].width,
              th[1].mobileWidth
            )}
            {renderTableCell(
              `${item?.phone_number?.code} ${item?.phone_number?.number}`,
              mobile ? th[2].mobileWidth : th[2].width,
              th[2].mobileWidth
            )}
            {renderTableCell(
              item?.userDetails?.username,
              mobile ? th[3].mobileWidth : th[3].width,
              th[3].mobileWidth
            )}
            <div
              className={`td ${th[4].mobileWidth ? "mobile-width" : ""}`}
              style={{ width: `${mobile ? th[4].mobileWidth : th[4].width}%` }}
              onClick={(e) => e.stopPropagation()}
            >
              <StatusSelect
                value={item.status}
                selectHandler={(e, id) =>
                  changeCustomerStatus(id, e.target.value)
                }
                itemId={item._id}
                statuses={statuses}
              />
            </div>
            <div
              className={`td ${th[5].mobileWidth ? "mobile-width" : ""}`}
              style={{ width: `${mobile ? th[5].mobileWidth : th[5].width}%` }}
            >
              <Switches
                value={!item.bot_suspended || ""}
                onChange={() => handleBotToggle(item)}
              />
            </div>
            <div
              className={`td ${th[6].mobileWidth ? "mobile-width" : ""}`}
              style={{ width: `${mobile ? th[6].mobileWidth : th[6].width}%` }}
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

export default CustomersTable;
