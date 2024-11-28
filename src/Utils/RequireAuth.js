import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  // const user = {
  //   user: "test",
  //   roles: ["SUPER_ADMIN"],
  //   access_token: "test",
  // }

  return (
    <>
      {user?.roles?.find((role) => allowedRoles?.includes(role)) ? (
        <Outlet />
      ) : user?.token ? (
        <Navigate to="/login" state={{ from: location }} replace />
      ) : (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireAuth;
