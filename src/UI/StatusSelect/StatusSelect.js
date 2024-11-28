import React, { useState, useEffect } from "react";

import styles from "./StatusSelect.module.css";

const StatusSelect = ({ value, selectHandler, itemId, statuses }) => {
  const [selectedStatus, setSelectedStatus] = useState(value);

  const handleChange = (event) => {
    setSelectedStatus(event.target.value);
    selectHandler(event, itemId);
  };

  useEffect(() => {
    setSelectedStatus(value);
  }, [value]);

  return (
    <div className={styles.container}>
      <select
        className={`${styles.select} ${styles[selectedStatus]}`}
        value={selectedStatus}
        onChange={handleChange}
      >
        {statuses.map((status) => (
          <option key={status.value} value={status.value}>
            {status.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusSelect;
