import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const tableFilterData = {
  company: {
    search: {},
    selects: [
      {},
      {
        name: "Status",
        value: "statuses",
        options: [
          {
            name: "Active",
            value: "active",
          },
          {
            name: "Inactive",
            value: "inactive",
          },
        ],
      },
    ],
  },
  customer: {
    search: {},
    selects: [
      {},
      {
        name: "Status",
        value: "statuses",
        options: [
          {
            name: "Pending",
            value: "pending",
          },
          {
            name: "Canceled",
            value: "canceled",
          },
          {
            name: "Approved",
            value: "approved",
          },
        ],
      },
    ],
  },
  invoice: {
    search: {
      options: [
        {
          name: "Phone",
          value: "phone",
        },
        {
          name: "ID",
          value: "ID",
        },
      ],
    },
    selects: [
      {},
      {
        name: "Status",
        value: "statuses",
        options: [
          {
            name: "Paid",
            value: "paid",
          },
          {
            name: "Canceled",
            value: "canceled",
          },
          {
            name: "Unpaid",
            value: "unpaid",
          },
        ],
      },
    ],
  },
  orders: {
    search: {},
    selects: [
      {},
      {
        name: "Status",
        value: "statuses",
        options: [
          {
            name: "Paid",
            value: "paid",
          },
          {
            name: "Canceled",
            value: "canceled",
          },
          {
            name: "Unpaid",
            value: "unpaid",
          },
        ],
      },
    ],
  },
  serviceitem: {
    search: {},
    selects: [
      {},
      {
        name: "Status",
        value: "statuses",
        options: [
          {
            name: "Pending",
            value: "pending",
          },
          {
            name: "Canceled",
            value: "canceled",
          },
          {
            name: "Approved",
            value: "approved",
          },
        ],
      },
    ],
  },
};

const th = {
  company: [
    {
      name: "Company Name",
      width: 20,
      mobileWidth: 20,
      id: 0,
    },
    {
      name: "Email",
      width: 20,
      mobileWidth: 20,
      id: 1,
    },
    {
      name: "Phone Number",
      width: 20,
      mobileWidth: 20,
      id: 2,
    },
    {
      name: "Created Date",
      width: 20,
      mobileWidth: 20,
      id: 3,
    },
    {
      name: "Status",
      width: 20,
      mobileWidth: 20,
      id: 4,
    },
    {
      name: "",
      width: 1,
      mobileWidth: 1,
      id: 5,
    },
  ],
  customer: [
    {
      name: "Full Name",
      width: 13,
      mobileWidth: 16,
      id: 0,
    },
    {
      name: "Gender",
      width: 7,
      mobileWidth: 7,
      id: 1,
    },
    {
      name: "Phone Number",
      width: 14,
      mobileWidth: 20,
      id: 2,
    },
    {
      name: "Operator Name",
      width: 14,
      mobileWidth: 14,
      id: 3,
    },
    // {
    //   name: "Note",
    //   width: 14,
    //   mobileWidth: 14,
    //   id: 4,
    // },
    {
      name: "Status",
      width: 14,
      mobileWidth: 14,
      id: 4,
    },
    // {
    //   name: "Created Data",
    //   width: 14,
    //   mobileWidth: 14,
    //   id: 5,
    // },
    {
      name: "Bot Status",
      width: 10,
      mobileWidth: 14,
      id: 5,
    },
    {
      name: "",
      width: 1,
      mobileWidth: 1,
      id: 6,
    },
  ],
  invoice: [
    {
      name: "Customer Name",
      width: 16,
      mobileWidth: 16,
      id: 0,
    },
    {
      name: "ID Number",
      width: 14,
      mobileWidth: 14,
      id: 1,
    },
    {
      name: "Operator",
      width: 12,
      mobileWidth: 12,
      id: 2,
    },
    {
      name: "Discount",
      width: 18,
      mobileWidth: 18,
      id: 3,
    },
    {
      name: "Status",
      width: 14,
      mobileWidth: 14,
      id: 4,
    },
    {
      name: "Price",
      width: 12,
      mobileWidth: 12,
      id: 5,
    },
    {
      name: "",
      width: 1,
      mobileWidth: 1,
      id: 6,
    },
  ],
  users: [
    {
      name: "Email",
      width: 20,
      mobileWidth: 20,
      id: 0,
    },
    {
      name: "User Name",
      width: 15,
      mobileWidth: 20,
      id: 1,
    },
    {
      name: "Role",
      width: 15,
      mobileWidth: 15,
      id: 2,
    },
    {
      name: "User Id",
      width: 30,
      mobileWidth: 30,
      id: 3,
    },
    {
      name: "Last Login",
      width: 15,
      mobileWidth: 15,
      id: 4,
    },
    {
      name: "",
      width: 1,
      mobileWidth: 1,
      id: 5,
    },
  ],
  expense: [
    {
      name: "Expense Category",
      width: 11,
      mobileWidth: 11,
      id: 0,
    },
    {
      name: "Description",
      width: 11,
      mobileWidth: 11,
      id: 1,
    },
    {
      name: "Document",
      width: 11,
      mobileWidth: 11,
      id: 2,
    },
    {
      name: "Payment Method",
      width: 11,
      mobileWidth: 11,
      id: 3,
    },
    {
      name: "Expense Amount",
      width: 9.5,
      mobileWidth: 9.5,
      id: 4,
    },
    {
      name: "Data",
      width: 11,
      mobileWidth: 11,
      id: 5,
    },
    {
      name: "",
      width: 0.5,
      mobileWidth: 0.5,
      id: 6,
    },
  ],
  serviceitem: [
    {
      name: "Service",
      width: 10,
      mobileWidth: 11,
      id: 0,
    },
    {
      name: "Data",
      width: 12,
      mobileWidth: 11,
      id: 1,
    },
    {
      name: "Destination",
      width: 14,
      mobileWidth: 11,
      id: 2,
    },
    {
      name: "Paid Amount",
      width: 9,
      mobileWidth: 11,
      id: 3,
    },
    {
      name: "Performance Status",
      width: 12,
      mobileWidth: 11,
      id: 4,
    },

    {
      name: "Status",
      width: 8,
      mobileWidth: 9.5,
      id: 5,
    },
    {
      name: "Service Company",
      width: 12,
      mobileWidth: 9.5,
      id: 6,
    },
    {
      name: "Customer Name",
      width: 12,
      mobileWidth: 0.5,
      id: 7,
    },
    {
      name: "Customer Phone Number",
      width: 12,
      mobileWidth: 0.5,
      id: 8,
    },
    {
      name: "",
      width: 1,
      mobileWidth: 0.5,
      id: 9,
    },
  ],
  serviceType: [
    {
      name: "Name",
      width: 50,
      mobileWidth: 50,
      id: 0,
    },
    {
      name: "Logo",
      width: 50,
      mobileWidth: 50,
      id: 1,
    },
    {
      name: "",
      width: 0.5,
      mobileWidth: 0.5,
      id: 2,
    },
  ],
  serviceCompany: [
    {
      name: "Name",
      width: 25,
      mobileWidth: 25,
      id: 0,
    },
    {
      name: "Bank Name",
      width: 24,
      mobileWidth: 24,
      id: 1,
    },
    {
      name: "Bank Account Number",
      width: 25,
      mobileWidth: 25,
      id: 2,
    },
    {
      name: "Type",
      width: 25,
      mobileWidth: 25,
      id: 3,
    },
    {
      name: "",
      width: 1,
      mobileWidth: 1,
      id: 4,
    },
  ],
  expenseCategory: [
    {
      name: "Name",
      width: 50,
      mobileWidth: 50,
      id: 0,
    },
    {
      name: "Description",
      width: 50,
      mobileWidth: 50,
      id: 1,
    },
    {
      name: "",
      width: 1,
      mobileWidth: 1,
      id: 2,
    },
  ],
  orders: [
    {
      name: "Full Name",
      width: 16,
      mobileWidth: 16,
      id: 0,
    },
    {
      name: "Phone Number",
      width: 12,
      mobileWidth: 12,
      id: 1,
    },
    // {
    //   name: "Payment Method",
    //   width: 16,
    //   mobileWidth: 16,
    //   id: 2,
    // },
    {
      name: "Operator",
      width: 14,
      mobileWidth: 14,
      id: 2,
    },
    {
      name: "Status",
      width: 12,
      mobileWidth: 12,
      id: 3,
    },
    {
      name: "Created Date",
      width: 14,
      mobileWidth: 14,
      id: 4,
    },
    {
      name: "",
      width: 0,
      mobileWidth: 1,
      id: 5,
    },
  ],
};

// Get the width of the screen
const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

// Main hook function to get table parameters
export const useTableParameters = (name) => {
  const { t } = useTranslation(); // Get translation function from useTranslation
  let [width, setWidth] = useState(getWidth());
  const [mobileExpand, setMobileExpand] = useState(null);

  // Update width on window resize
  useEffect(() => {
    let timeoutId = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setWidth(getWidth()), 150);
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  // Determine if the view is mobile
  let mobile = false;
  if (width <= 1300) {
    mobile = true;
  }

  // Function to expand or collapse rows in mobile view
  let mobileExpandFunc = (id) => {
    if (width <= 1300) {
      if (id !== mobileExpand) {
        setMobileExpand(id);
      } else {
        setMobileExpand(null);
      }
    }
  };

  // Translate table headers
  const getTranslatedTh = (headers) => {
    return headers.map((header) => ({
      ...header,
      name: t(`${name}.${header.name}`, header.name),
    }));
  };

  // Translate options in selects
  const translateOptions = (selects) =>
    selects.map((select) => ({
      ...select,
      options: select?.options?.map((option) => ({
        ...option,
        name: t(`statuses.${option.name}`, option.name),
      })),
    }));

  if (name.toLowerCase() === "company") {
    return {
      tableFilterData: {
        ...tableFilterData.company,
        selects: translateOptions(tableFilterData.company.selects),
      },
      th: getTranslatedTh(th.company),
      mobileExpandFunc,
      mobileExpand,
      mobile,
    };
  }

  if (name.toLowerCase() === "customer") {
    return {
      tableFilterData: {
        ...tableFilterData.customer,
        selects: translateOptions(tableFilterData.customer.selects),
      },
      th: getTranslatedTh(th.customer),
      mobileExpandFunc,
      mobileExpand,
      mobile,
    };
  }

  if (name.toLowerCase() === "invoice") {
    return {
      tableFilterData: {
        ...tableFilterData.invoice,
        search: {
          ...tableFilterData.invoice.search,
          options: tableFilterData?.invoice?.search?.options?.map((option) => ({
            ...option,
            name: t(`searchOptions.${option.name}`),
          })),
        },
        selects: translateOptions(tableFilterData.invoice.selects),
      },
      th: getTranslatedTh(th.invoice),
      mobileExpandFunc,
      mobileExpand,
      mobile,
    };
  }

  if (name.toLowerCase() === "users") {
    return {
      th: getTranslatedTh(th.users),
      mobileExpandFunc,
      mobileExpand,
      mobile,
    };
  }

  if (name.toLowerCase() === "expense") {
    return {
      th: getTranslatedTh(th.expense),
      mobileExpandFunc,
      mobileExpand,
      mobile,
    };
  }

  if (name.toLowerCase() === "serviceitem") {
    return {
      tableFilterData: {
        ...tableFilterData.serviceitem,
        selects: translateOptions(tableFilterData.serviceitem.selects),
      },
      th: getTranslatedTh(th.serviceitem),
      mobileExpandFunc,
      mobileExpand,
      mobile,
    };
  }

  if (name.toLowerCase() === "servicetype") {
    return {
      th: getTranslatedTh(th.serviceType),
      mobileExpandFunc,
      mobileExpand,
      mobile,
    };
  }

  if (name.toLowerCase() === "servicecompany") {
    return {
      th: getTranslatedTh(th.serviceCompany),
      mobileExpandFunc,
      mobileExpand,
      mobile,
    };
  }

  if (name.toLowerCase() === "expensecategory") {
    return {
      th: getTranslatedTh(th.expenseCategory),
      mobileExpandFunc,
      mobileExpand,
      mobile,
    };
  }

  if (name.toLowerCase() === "orders") {
    return {
      tableFilterData: {
        ...tableFilterData.orders,
        selects: translateOptions(tableFilterData?.orders?.selects),
      },
      th: getTranslatedTh(th?.orders),
      mobileExpandFunc,
      mobileExpand,
      mobile,
    };
  }
};
