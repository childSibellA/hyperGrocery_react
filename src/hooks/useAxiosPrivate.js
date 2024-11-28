import { useEffect } from "react";
import axiosPrivate from "../api/axiosPrivate";
import useRefreshToken from "./useRefreshToken";
import { useSelector } from "react-redux";

const useAxiosPrivate = () => {
  const access_token = useSelector((state) => state.user.access_token);
  const refresh = useRefreshToken();

  useEffect(() => {
    const reqInterceptor = axiosPrivate.interceptors.request.use(
      (request) => {
        if (!request.headers["authorization"]) {
          request.headers["authorization"] = `Bearer ${access_token}`;
        }
        return request;
      },
      (error) => Promise.reject(error)
    );

    const resInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;

          try {
            const newAccessToken = await refresh(); // Call refresh and get new token
            prevRequest.headers["authorization"] = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest); // Retry the original request with new token
          } catch (err) {
            console.error("Refresh token failed. Logging out.");
            // Handle logout or redirect to login page here if needed
            return Promise.reject(err); // Reject if refresh fails
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(reqInterceptor);
      axiosPrivate.interceptors.response.eject(resInterceptor);
    };
  }, [access_token]);

  return axiosPrivate;
};

export default useAxiosPrivate;
