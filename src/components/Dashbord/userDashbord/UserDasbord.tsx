import { FaSignOutAlt } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { RiListView } from "react-icons/ri";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { logout } from "../../../redux/features/auth/authSlice";

export default function UserDasbord() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); 
  };

  return (
    <div className="w-dvw h-dvh bg-gray-200 grid grid-cols-6">
      {/* Sidebar */}
      <div className="col-span-1 bg-white">
        <div className="p-2 h-full w-full flex flex-col bg-white dark:bg-gray-900 border-r border-r-gray-200">
          {/* Logo */}
          <a href="/">
            <div className="flex text-md md:text-2xl flex-col md:flex-row justify-center lg:justify-start font-bold items-center gap-1 py-2 px-0 md:px-2 lg:px-4 cursor-pointer">
              <span>Stationery</span>
              <span>Shop</span>
            </div>
          </a>

          {/* Menu Items */}
          <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden flex-grow pt-2 justify-between">
            <div className="flex flex-col space-y-1 mx-1 lg:mt-1">
              <div className="px-5 pt-4 hidden lg:block">
                <div className="flex flex-row items-center">
                  <div className="text-xs font-bold tracking-wide text-gray-600">
                    Menu
                  </div>
                </div>
              </div>
              <a
                className="flex flex-row items-center justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5 lg:pr-6 font-semibold text-gray-500 hover:text-primary-400 cursor-pointer"
                href="/dashboard/view-orders" 
              >
                <span className="inline-flex justify-center items-center ml-3.5">
                  <RiListView size={20} />
                </span>
                <span className="ml-0 lg:ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">
                  View orders
                </span>
              </a>
              <a
                className="flex flex-row items-center justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5 lg:pr-6 font-semibold text-gray-500 hover:text-primary-400 cursor-pointer"
                href="/dashboard/manage-profile" 
              >
                <span className="inline-flex justify-center items-center ml-3.5">
                  <MdManageAccounts size={20} />
                </span>
                <span className="ml-0 lg:ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">
                  Manage profile
                </span>
              </a>
            </div>
          </div>

          {/* Logout */}
          <div className="px-1">
            <div className="flex flex-row items-center justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5 lg:pr-6 font-semibold hover:text-primary-400 cursor-pointer text-red-400 hover:text-red-600">
              <span className="inline-flex justify-center items-center ml-3.5">
                <FaSignOutAlt size={20} />
              </span>
              <button
                onClick={handleLogout}
                className="ml-2 text-sm tracking-wide truncate capitalize hidden lg:block"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View Content */}
      <div className="col-span-5 bg-white">
        <h1 className="text-xl md:text-3xl text-center mt-3 font-bold">User Dashboard</h1>
        <Outlet /> 
      </div>
    </div>
  );
}
