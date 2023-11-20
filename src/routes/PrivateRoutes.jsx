import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

import { Bars } from "react-loader-spinner";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <Bars
        height="80"
        width="80"
        color="#4440da"
        ariaLabel="bars-loading"
        wrapperClass="mx-auto min-h-[400px] md:min-h-[500px] flex items-center justify-center"
        visible={true}
      />
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={location.pathname}></Navigate>;
};

export default PrivateRoutes;
