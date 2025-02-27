import { useState } from "react";
import { toast } from "sonner";
import { useUpdateOrderMutation } from "../../../redux/features/orderManagmentApi/OrderManagmentApi";
import { TExtraError } from "../../Types";
import UpOrderStateAdmin from "./UpOrderStateAdmin";

interface TOrderStatus {
    orderStatus: string;
    orderId: string;
}

const UpdateOrderStatusByAdmin = ({ orderStatus, orderId }: TOrderStatus) => {
    // console.log(orderStatus, orderId);

    const [updateOrder] = useUpdateOrderMutation();
    const [isOpen, setIsOpen] = useState(false);

    // Modal handler function
    const modalHandler = async (selectedStatus: string) => {
        try {
            await updateOrder({ orderId, body: { status: selectedStatus } }).unwrap();
            // console.log("Update Result:", result);
            toast.success('Order status updated successfully');
            setIsOpen(false);
        } catch (error) {
            console.error("Update Error:", error);
            toast.error((error as TExtraError)?.data?.message || 'Failed to delete user');
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
                <span className='relative'>{orderStatus}</span>
            </button>
            {/* Update Order Modal */}
            <UpOrderStateAdmin
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                modalHandler={modalHandler}
                orderStatus={orderStatus}
            />
        </>
    );
};

export default UpdateOrderStatusByAdmin;

