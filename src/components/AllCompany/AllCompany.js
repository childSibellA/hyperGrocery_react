import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ToastContainer, toast } from "react-toastify";
import { useTableParameters } from "../../hooks/useTableParameters";
import { AdminPanel } from "../../UI/AdminPanel/AdminPanel";
import { Popup } from "../../UI/Popup/Popup";
import CompaniesTable from "./Table";
import CompanyDetails from "./CompanyDetails";
import "react-toastify/dist/ReactToastify.css";

const AllCompany = () => {
  const axios = useAxiosPrivate();
  const { tableFilterData, th, mobile, mobileExpand } =
    useTableParameters("company");

  const [pageNow, setPageNow] = useState(1);
  const [pageAll, setPageAll] = useState(1);
  const [popupShow, setPopupShow] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companiesData, setCompaniesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const clearPopUpData = () => {
    setSelectedCompany(null); // Clear selected company data when closing popup
    setPopupShow(null);
  };

  const getCompaniesList = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("/company/get-all-companies", {
        page: pageNow,
        limit: 10, 
        search: "", 
      });
      if (res.data) {
        setCompaniesData(res.data.companies);
        setPageAll(res.data.totalPages);
      }
    } catch (error) {
      toast(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    getCompaniesList();
  }, [pageNow]);

  return (
    <>
      <AdminPanel
        adminPage={"table"}
        tableData={
          <CompaniesTable
            companiesData={companiesData}
            th={th}
            mobile={mobile}
            mobileExpand={mobileExpand}
            setPopupShow={setPopupShow}
            setSelectedCompany={setSelectedCompany}
          />
        }
        tableHead={th}
        pageLabel={"Companies"}
        dataLoading={isLoading}
        tableFilterData={tableFilterData}
        paginationCurrent={pageNow}
        paginationTotal={pageAll}
        paginationEvent={(page) => setPageNow(page)}
      />

      {selectedCompany && (
        <Popup
          label={"Company Details"}
          handlePopUpClose={clearPopUpData}
          customStyles={{ maxWidth: "80%" }}
          popUpElement={<CompanyDetails company={selectedCompany} />}
        />
      )}

      <ToastContainer theme="dark" />
    </>
  );
};

export default AllCompany;
