import { Outlet } from "react-router-dom";
import Navber from "../Home/Navber/Navber";
import Footer from "../Home/Footer/Footer";

export default function Root() {
  return (
<div>
    <Navber/>
    <Outlet />
    <Footer />
</div>
  )
}
