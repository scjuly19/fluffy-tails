import { useAuthContext } from "../context/authContext/authContext";
import { Navigate,useLocation } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const { authed } = useAuthContext();
  const location = useLocation();
  return authed ? children : <Navigate to="/login" replace state={{ path: location.pathname }}/>;
};
