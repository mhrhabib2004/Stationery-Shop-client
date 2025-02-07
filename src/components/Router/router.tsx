import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import Home from "../Home/Home/Home";
import DashbordLeyout from "../Leyout/DashbordLeyout";
import NotFound from "../Error/NotFound";
import PrivateRoute from "../../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement:<NotFound />,
      children:[
        {
            index:true,
            element:<Home />

        },
        {
            path:"login",
            element:<Login />
        },
        {
            path:"register",
            element:<Register />
        },
        {
            path:"about",
            element:<About />
        },
      ],
     
    },
    {
      path: "/dashbord",
      element:<PrivateRoute ><DashbordLeyout /> </PrivateRoute>,
      errorElement:<NotFound />,
      children:[
        {}
      ]
    }                     
  ]);
   export default router;