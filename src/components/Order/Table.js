import React, { useState } from "react";
import { EditIcon, DeleteIcon, InfoIcon, InviceSvg } from "../../assets/svgs";
import { MoreButton } from "../../UI/MoreButton/MoreButton";
import { TimestampConverter } from "../../Utils/TimestampConverter";
import StatusSelect from "../../UI/StatusSelect/StatusSelect";
import { useTranslation } from "react-i18next";

const Table = ({
  ordersData,
  th,
  mobile,
  mobileExpand,
  deleteOrder,
  editOrderHandler,
  setPopupShow,
  setSelectedOrder,
  changeOrderStatus,
}) => {
  const { t } = useTranslation();

  const getDropdownData = (order) => [
    {
      id: 0,
      list: [
        {
          title: t("moreButton.details"),
          onClick: () => {
            setPopupShow("More Info");
            setSelectedOrder(order);
          },
          svg: <InfoIcon />,
        },
      ],
    },
    // {
    //   id: 2,
    //   list: [
    //     {
    //       title: t("moreButton.edit"),
    //       onClick: () => {
    //         editOrderHandler(order);
    //       },
    //       svg: <EditIcon />,
    //     },
    //   ],
    // },
    {
      id: 3,
      list: [
        {
          title: t("moreButton.delete"),
          onClick: () => {
            deleteOrder(order._id);
          },
          svg: <DeleteIcon />,
        },
      ],
    },
    {
      id: 4,
      list: [
        {
          title: t("moreButton.generateInvoice"),
          onClick: () => {
            setPopupShow("Generate Invoice");
            setSelectedOrder(order);
          },
          svg: <InviceSvg />,
        },
      ],
    },
  ];

  let statuses = [
    { name: t("statuses.paid"), value: "paid" },
    { name: t("statuses.unpaid"), value: "unpaid" },
    { name: t("statuses.canceled"), value: "canceled" },
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
  const tableData = ordersData?.map((order, index) => (
    <div
      key={index}
      className={`table-parent ${mobileExpand === index ? "active" : ""}`}
    >
      <div
        className="table"
        onClick={() => {
          setPopupShow("More Info");
          setSelectedOrder(order);
        }}
      >
        {renderTableCell(
          order?.customer_id?.full_name || "N/A",
          mobile ? th[0].mobileWidth : th[0].width,
          th[0].mobileWidth
        )}
        {renderTableCell(
          order?.customer_id?.phone_number?.number || "No Number",
          mobile ? th[1].mobileWidth : th[1].width,
          th[1].mobileWidth
        )}
        {renderTableCell(
          order?.operator_id?.username || "N/A",
          mobile ? th[2].mobileWidth : th[2].width,
          th[2].mobileWidth
        )}
        <div
          className={`td ${th[3].mobileWidth ? "mobile-width" : ""}`}
          style={{ width: `${mobile ? th[3].mobileWidth : th[3].width}%` }}
          onClick={(e) => e.stopPropagation()}
        >
          <StatusSelect
            value={order.status}
            selectHandler={(e) => changeOrderStatus(order._id, e.target.value)}
            itemId={order._id}
            statuses={statuses}
          />
        </div>
        {renderTableCell(
          TimestampConverter(order?.createdAt),
          mobile ? th[4].mobileWidth : th[4].width,
          th[4].mobileWidth
        )}
        <div
          className={`td ${th[5].mobileWidth ? "mobile-width" : ""}`}
          style={{
            width: `${mobile ? th[5].mobileWidth : th[5].width}%`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <MoreButton dropdownData={getDropdownData(order)} />
        </div>
      </div>
    </div>
  ));

  return <>{tableData}</>;
};

export default Table;
