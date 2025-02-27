import { useAppSelector } from "../../redux/hooks";
import Admindasbord from "../Dashbord/AdminDashbord/AdminDasbord";
import UserDasbord from "../Dashbord/userDashbord/UserDasbord";


// Define the type for the user object (adjust according to your Redux state structure)
export interface User {
  role: 'user' | 'admin';
}

export default function DashbordLayout() {
  // Use the `useAppSelector` hook to get the user from the Redux store
  const user = useAppSelector((state) => state.auth.user);

  // console.log(user?.role);

  return (
    <div>
      {user?.role === 'user' && <UserDasbord />}
      {user?.role === 'admin' && <Admindasbord />}
    </div>
  );
}