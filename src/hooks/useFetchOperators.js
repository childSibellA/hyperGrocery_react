import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const useFetchOperators = (companyId) => {
  const [operators, setOperators] = useState([]);
  const [error, setError] = useState(null);

  // Call useAxiosPrivate directly
  const axios = useAxiosPrivate();

  useEffect(() => {
    const fetchOperators = async () => {
      if (!companyId) {
        setError("Company ID is required to fetch operators.");
        return;
      }

      try {
        const response = await axios.post("/users/get-all-operators", {
          company_id: companyId,
        });
        const transformData = (data) =>
          data?.map((user) => ({
            name: user.username,
            value: user._id,
          }));
        setOperators(transformData(response.data.operators));
      } catch (err) {
        setError("Error fetching operators: " + err.message);
      }
    };

    fetchOperators();
  }, [companyId, axios]); // Only re-run if companyId or axios changes

  return { operators, error };
};

export default useFetchOperators;
