import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useUpdateUserMutation } from "../../../redux/features/userManagment/userManagmentApi";
import { RootState } from "../../../redux/store";
import { TExtraError } from "../../Types";
import UpdateUserStat from "./UpdateUserStat";


interface TStatus {
    isdeactive: boolean;
    userId: string;
    email: string;
}

const UpdateUserStatus = ({ isdeactive, userId, email }: TStatus) => {

    const [updateUser] = useUpdateUserMutation();
    const currentUser = useSelector((state: RootState) => state.auth.user);
    const [isOpen, setIsOpen] = useState(false);

    // Define user status based on isdeactive
    const userStatus = isdeactive ? "Deactivated" : "Active";

    // Modal handler function
    const modalHandler = async (selectedStatus: string) => {
        if (!currentUser) {
            toast.error('You must be logged in to perform this action');
            setIsOpen(false);
            return;
        }

        if (currentUser.user === email) {
            toast.error('Action Not Allowed');
            setIsOpen(false);
            return;
        }

        try {
            await updateUser({ userId, body: { isdeactive: selectedStatus === "Deactivated" } }).unwrap();
            toast.success('User status updated successfully');
            setIsOpen(false);
        } catch (error) {
            console.error("Update Error:", error);
            toast.error((error as TExtraError)?.data?.message || 'Failed to update user');
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
            >
                <span
                    aria-hidden='true'
                    className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                ></span>
                <span className='relative'>{userStatus}</span>
            </button>
            
            {/* Update User Modal */}
            <UpdateUserStat
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                modalHandler={modalHandler}
                userStatus={userStatus}
            />
        </>
    );
};

export default UpdateUserStatus;
