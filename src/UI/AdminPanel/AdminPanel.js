import { React } from "react";
import "./AdminPanel.css";
import { Table } from "../Table/Table";
import { FilterBox } from "../FilterBox/FilterBox";
import { Visual } from "../Visual/Visual";
import { TableElement } from "../TableElement/TableElement";

export const AdminPanel = ({
  tableFilter,
  searchLabel,
  tableFilterData,
  setTableFilterOutcomingData,
  tableFilterOutcomingData,
  tableSearchSelect,
  tableHeader,
  adminPage,
  pageLabel,
  tableHeaderButtons,
  tableHead,
  mobile,
  tableData,
  dataLoading,
  handleViewAll,
  tableEmulator,
  paginationCurrent,
  paginationTotal,
  paginationEvent,
}) => {
  let filter;
  if (tableFilter) {
    filter = (
      <FilterBox
        searchLabel={searchLabel}
        tableFilterData={tableFilterData}
        setTableFilterOutcomingData={setTableFilterOutcomingData}
        tableFilterOutcomingData={tableFilterOutcomingData}
        tableSearchSelect={tableSearchSelect}
        tableHeader={tableHeader}
        customStyles={{ marginBottom: "20px" }}
      />
    );
  }

  return (
    <div className={`admin-content`}>
      {adminPage === "table" && (
        <>
          <Visual
            element={"table-header"}
            label={pageLabel}
            buttons={tableHeaderButtons}
            fontSize={"font-20"}
            customStyles={{ marginBottom: "20px" }}
          />
          {filter}
          <Table
            type={"table-version"}
            tableHead={tableHead}
            mobile={mobile}
            tableData={tableData}
            loading={dataLoading}
            handleViewAll={handleViewAll}
            tableEmulator={tableEmulator}
            customThStyles={{ fontWeight: "bold", fontSize: "16px" }}
          />
          <TableElement
            customStyle={{ marginTop: "30px", paddingBottom: "100px" }}
            type={"pagination"}
            currentPage={paginationCurrent}
            totalCount={paginationTotal}
            onPageChange={paginationEvent}
          />
        </>
      )}
    </div>
  );
};
