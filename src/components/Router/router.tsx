import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import Home from "../Home/Home/Home";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
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
      ]
    },
  ]);
   export default router;