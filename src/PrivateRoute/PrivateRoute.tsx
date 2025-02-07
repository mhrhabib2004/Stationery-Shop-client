import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react"; 
import { RootState } from "../redux/store";
import LoadingProgress from "../components/pages/loadingProgress";

interface TChildren {
  children: React.ReactNode;}

const PrivateRoute: React.FC<TChildren> = ({ children }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [user]);

  if (loading) {
    return <LoadingProgress />;
  }

  if (user) {
    return <>{children}</>; // Render the children passed to this component
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
