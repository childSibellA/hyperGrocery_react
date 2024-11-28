import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Signin } from "../../UI/Signin/Signin";
import { useState } from "react";
import { logIn, setIsLoading } from "../../store/userReducer ";
import { toast } from "react-toastify";

const Login = () => {
  const axios = useAxiosPrivate();
  const [loginError, setLoginError] = useState("");
  const { loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (currentUser) => {
    setIsLoading(true);

    try {
      const { data } = await axios.post("/auth/login", currentUser);
      const { email, access_token, user_id, roles, companyId, company } = data;

      dispatch(
        logIn({
          email,
          access_token,
          user: user_id,
          roles: roles,
          companyId: companyId,
          company,
        })
      );

      navigate("/customers");
      toast("welcome in Aviafy");
    } catch (err) {
      setIsLoading(false);
      setLoginError(err.response.data.message);
      setTimeout(() => setLoginError(""), 5000);
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Signin handleSubmit={handleSubmit} loginError={loginError} />
      )}
    </>
  );
};

export default Login;
