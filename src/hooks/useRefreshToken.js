import axios from "../api/axiosPrivate";
import { setNewAccessToken } from "../store/userReducer ";
import { useDispatch } from "react-redux";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      const { data } = await axios.get(process.env.REACT_APP_REFRESH_URL);

      dispatch(
        setNewAccessToken({
          access_token: data.access_token,
        })
      );

      return data.access_token; // Return the new access token
    } catch (err) {
      console.error("Error refreshing token");
      console.error(err);
      throw err; // Throw the error to handle it in useAxiosPrivate
    }
  };

  return refresh;
};

export default useRefreshToken;
