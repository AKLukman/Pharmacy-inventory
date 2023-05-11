import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useSutff from "../../hooks/useStuff";
import { isSaturday } from "date-fns";

const StuffRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isStuff, isStuffLoading] = useSutff(user?.email);
  const location = useLocation();

  if (loading || isStuffLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user && isStuff) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default StuffRoute;
