import React from "react";
import { Tabs } from "../../UI/Tabs/Tabs";
import { Input } from "../../UI/Input/Input";
import { Button } from "../../UI/Button/Button";
import Xsvg from "../../UI/Input/svg/Xsvg";
import ServiceCard from "./ServiceCard";
import { useTranslation } from "react-i18next";
import { getServiceInputs } from "./inputs";
import styles from "./ServiceTabs.module.css"; // Adjust the path accordingly
import { AddSquareIcon } from "../../assets/svgs";

const ServiceTabs = ({
  activeTab,
  setActiveTab,
  markedServices,
  setMarkedServices,
  handleInputChange,
  edit,
  disabledBtn,
  popUpData,
  setPopUpData,
  serviceTypes,
}) => {
  const { t } = useTranslation();
  const serviceInputs = getServiceInputs(popUpData, setPopUpData, activeTab, t);

  const addService = () => {
    const newService = {
      serviceName: activeTab,
      type: markedServices,
      start_date: popUpData.start_date || "",
      end_date: popUpData.end_date || "",
      location: popUpData.location || "",
      destination: popUpData.destination || "",
      visa_type: popUpData.visa_type || "",
      hotel_name: popUpData.hotel_name || "",
      invitation_type: popUpData.invitation_type || "",
      insurance_provider: popUpData.insurance_provider || "",
      zone: popUpData.zone || "",
      baggage_type: popUpData.baggage_type || "",
      baggage_weight: popUpData.baggage_weight || "",
    };

    setPopUpData((prev) => ({
      ...prev,
      services: [...prev.services, newService],
    }));

    // Reset relevant fields after adding a service
    setPopUpData((prev) => ({
      ...prev,
      start_date: "",
      end_date: "",
      location: "",
      destination: "",
      detales: "",
      visa_type: "",
      hotel_name: "",
      invitation_type: "",
      insurance_provider: "",
      zone: "",
      baggage_type: "",
      baggage_weight: "",
    }));
  };

  const addSameService = (existingService) => {
    const newService = { ...existingService };
    setPopUpData((prev) => ({
      ...prev,
      services: [...prev.services, newService],
    }));
  };

  const removeService = (index) => {
    setPopUpData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <Tabs
        type={"simple"}
        tabsData={serviceTypes}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        customStyles={{ flexWrap: "wrap", height: "auto" }}
        setMarkedServices={setMarkedServices}
      />
      {activeTab && (
        <div className={`${styles.addServiceContainer}`}>
          <div
            className={styles.closeServiceContainer}
            onClick={() => setActiveTab("")}
          >
            <Xsvg />
          </div>
          <h1 className={styles.serviseInputsTitle}>
            Enter {activeTab} Details
          </h1>
          <div className={styles.serviseInputs}>
            {serviceInputs.map((params, index) => (
              <Input
                key={index}
                type={params.type}
                label={params.title}
                defaultData={params.options}
                value={params.value || ""}
                name={params.name}
                selectHandler={(opt) => {
                  handleInputChange(opt, params);
                }}
                selectLabel={"select"}
                placeholder={params.placeholder}
                onChange={(e) => handleInputChange(e, params)}
                editable={edit}
              />
            ))}
          </div>
          <div className={styles.headerAndAddButton}>
            <Button
              label={`Add ${activeTab}`}
              type={"btn-primary"}
              element={"button"}
              onClick={addService}
              customStyles={{
                width: "200px",
                height: "50px",
              }}
              svg={<AddSquareIcon />}
              disabled={disabledBtn}
            />
          </div>
        </div>
      )}
      {popUpData?.services?.length > 0 && (
        <div className={styles.servicesContainer}>
          {popUpData?.services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              removeService={removeService}
              addSameService={addSameService}
              edit={edit}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ServiceTabs;
