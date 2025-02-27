import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import Home from "../Home/Home/Home";
import DashbordLeyout from "../Leyout/DashbordLeyout";
import NotFound from "../Error/NotFound";
import PrivateRoute from "../../PrivateRoute/PrivateRoute";
import ViewOrders from "../Dashbord/userDashbord/ViewOrders";
import ManageProfile from "../Dashbord/userDashbord/ManageProfile";
import Allproducts from "../Products/allproducts";
import ContactUs from "../pages/ContactUs";
import CreateProduct from "../Dashbord/AdminDashbord/CreatProduct";
import ProductsManagment from "../Dashbord/AdminDashbord/ProductsManagment";
import OrderManageAdmin from "../Dashbord/AdminDashbord/OrderManageAdmin";
import UpdateUserStatus from "../Dashbord/AdminDashbord/UpdateUserStatus";

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
        {
            path:"ContactUs",
            element:<ContactUs/>
        },
        {
          path:"all-products",
          element:<Allproducts />
        }
      ],
     
    },
    {
      path: "/dashboard",
      element:<PrivateRoute ><DashbordLeyout /> </PrivateRoute>,
      errorElement:<NotFound />,
      children:[
        {
          path:'view-orders',
          index:true,
          element:<ViewOrders />
        },
        {
          path:"manage-profile",
          element:<ManageProfile />
        },
        {
          path:'create-products',
          element:<CreateProduct />
        },
        {
          path:'products-managment',
          element:<ProductsManagment />
        },
        {
          path:'order-managment',
          element:<OrderManageAdmin />
        },
        {
          path:'user-managment',
          element:<UpdateUserStatus isdeactive={false} userId={""} email={""} />

        }
      ]
    }                     
  ]);
   export default router;