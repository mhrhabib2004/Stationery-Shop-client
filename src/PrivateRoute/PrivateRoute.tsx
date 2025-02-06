

import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react"; 
import { RootState } from "../redux/store";


interface TChildren {
    children: JSX.Element;
}

const PrivateRoute = ({ children }: TChildren) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [loading, setLoading] = useState(true); 
    const location = useLocation();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); 
        }, 500); 

   
        return () => clearTimeout(timer);

    }, [user]);


    if (loading) {
        return <LoadingProgress />
    }

    if (user) {
        return <>{children}</>; 
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;