import React from "react";
import { useSelector } from "react-redux";
import { MoreButton } from "../../UI/MoreButton/MoreButton";
import StatusSelect from "../../UI/StatusSelect/StatusSelect";
import { DeleteIcon, InfoIcon } from "../../assets/svgs";
import { toast } from "react-toastify";
import useCopyToClipboard from "../../hooks/useCopy";
import { useTranslation } from "react-i18next";

const InvoiceTable = ({
  invoiceData,
  mobile,
  th,
  mobileExpand,
  setPopupShow,
  fillPopupDataHandler,
  changeInvoicestatus,
  onCopy,
  deleteInvoice,
}) => {
  // const [isCopied, copyToClipboard] = useCopyToClipboard();
  const role = useSelector((state) => state.user.roles[0]);
  const { t } = useTranslation();

  const getDropdownData = (
    item,
    fillPopupDataHandler,
    setPopupShow,
    deleteInvoice
  ) => {
    const dropdownData = [
      {
        id: 0,
        list: [
          {
            title: t("moreButton.view"),
            onClick: () => {
              fillPopupDataHandler(item);
              setPopupShow("PDF");
            },
            svg: <InfoIcon />,
          },
        ],
      },
    ];

    if (role === "SUPER_ADMIN") {
      dropdownData.push({
        id: 1,
        list: [
          {
            title: t("moreButton.delete"),
            onClick: () => {
              setPopupShow("Delete");
              deleteInvoice(item._id);
            },
            svg: <DeleteIcon />,
          },
        ],
      });
    }

    return dropdownData;
  };

  let statuses = [
    { name: t("statuses.paid"), value: "paid" },
    { name: t("statuses.unpaid"), value: "unpaid" },
    { name: t("statuses.canceled"), value: "canceled" },
  ];

  // Function to render each table cell
  const renderTableCell = (content, width, isMobileWidth, onClick) => (
    <div
      className={`td ${isMobileWidth ? "mobile-width" : ""}`}
      style={{ width: `${width}%` }}
      // onClick={onClick}
    >
      <span>{content}</span>
    </div>
  );

  const tableData = invoiceData?.map((invoice, index) => (
    <div
      key={index}
      className={`table-parent ${mobileExpand === index ? "active" : ""}`}
      onClick={() => {
        fillPopupDataHandler(invoice);
        setPopupShow("PDF");
      }}
    >
      <div className="table">
        {renderTableCell(
          invoice?.customer_id?.full_name || "N/A",
          mobile ? th[0].mobileWidth : th[0].width,
          th[0].mobileWidth
        )}
        {renderTableCell(
          invoice?.invoice_number || "N/A",
          mobile ? th[1].mobileWidth : th[1].width,
          th[1].mobileWidth,
          {
            /* () => {
            copyToClipboard(invoice.invoice_number);
            toast(`${invoice?.company_id?.name} invoice ID is copied`);
            onCopy && onCopy(invoice.invoice_number);
          } */
          }
        )}
        {renderTableCell(
          invoice?.operator_id?.username || "N/A",
          mobile ? th[2].mobileWidth : th[2].width,
          th[2].mobileWidth
        )}
        {renderTableCell(
          invoice?.discount || "No discount",
          mobile ? th[3].mobileWidth : th[3].width,
          th[3].mobileWidth
        )}
        <div
          className={`td ${th[4].mobileWidth ? "mobile-width" : ""}`}
          style={{ width: `${mobile ? th[4].mobileWidth : th[4].width}%` }}
          onClick={(e) => e.stopPropagation()}
        >
          <StatusSelect
            value={invoice.status}
            selectHandler={(e) =>
              changeInvoicestatus(invoice._id, e.target.value)
            }
            itemId={invoice._id}
            statuses={statuses}
          />
        </div>
        {renderTableCell(
          `${invoice?.total_price} ლარი`,
          mobile ? th[5].mobileWidth : th[5].width,
          th[5].mobileWidth
        )}
        <div
          className={`td ${th[6].mobileWidth ? "mobile-width" : ""}`}
          style={{ width: `${mobile ? th[6].mobileWidth : th[6].width}%` }}
          onClick={(e) => e.stopPropagation()}
        >
          <MoreButton
            dropdownData={getDropdownData(
              invoice,
              fillPopupDataHandler,
              setPopupShow,
              deleteInvoice
            )}
          />
        </div>
      </div>
    </div>
  ));

  return <>{tableData}</>;
};

export default InvoiceTable;
