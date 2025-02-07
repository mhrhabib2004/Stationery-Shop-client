import {  useAppSelector } from "../../redux/hooks";
import Admindasbord from "../Dashbord/AdminDasbord";


export default function DashbordLeyout() {
  // const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user);
  console.log(user)
  return (
    <div>
<Admindasbord />
    </div>
  )
}
