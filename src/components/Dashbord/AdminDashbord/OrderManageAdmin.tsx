// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useDeleteOrderMutation, useGetAllOrdersQuery } from "@/redux/features/orderManagmentApi/OrderManagmentApi";
// import LoadingProgress from "@/shared/LoadingProgress";
// import { TOrders } from "@/types/orderTypes";
// import { useState } from "react";
// import { toast } from "sonner";
// import Swal from "sweetalert2";
// import UpdateOrderStatusByAdmin from "./UpdateOrderStatusByAdmin";
// import { TExtraError } from "@/types";
// import { FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import React Icons

// const OrderManageAdmin = () => {
//     const [currentPage, setCurrentPage] = useState(1);

//     const { data: orderData, isLoading, isError } = useGetAllOrdersQuery([
//         { name: "page", value: currentPage },
//         { name: "limit", value: 6 },
//     ]);

//     const [deleteOrder] = useDeleteOrderMutation();

//     const orders = orderData?.data?.result;
//     const totalorder = orderData?.data?.meta?.total;
//     const totalPage = orderData?.data?.meta?.totalPage;
//     const limit = orderData?.data?.meta?.limit;

//     if (isLoading) {
//         return <LoadingProgress />;
//     }

//     if (isError) {
//         return <div className="text-center text-red-500">Failed to fetch data.</div>;
//     }

//     // Date formatting function
//     const formatDate = (dateString: string) => {
//         const date = new Date(dateString);
//         return date.toLocaleDateString();
//     };

//     const handleNextPage = () => {
//         if (currentPage < totalPage) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     const handlePreviousPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     const handlePageChange = (page: number) => {
//         setCurrentPage(page);
//     };

//     // Order Delete Function
//     const handleDeleteProduct = async (or: any) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!"
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 try {
//                     await deleteOrder({ id: or._id }).unwrap();
//                     Swal.fire({
//                         title: "Deleted!",
//                         text: "The order has been deleted.",
//                         icon: "success"
//                     });
//                 } catch (error) {
//                     console.error("Delete Error:", error);
//                     toast.error((error as TExtraError)?.data?.message || 'Failed to delete user');
//                     Swal.fire({
//                         title: "Error!",
//                         text: (error as TExtraError)?.data?.message || 'Failed to delete user',
//                         icon: "error"
//                     });
//                 }
//             }
//         });
//     };

//     return (
//         <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
//             <section className="container mx-auto">
//                 <div className="flex items-center justify-center gap-3 mb-8">
//                     <h2 className="font-semibold text-3xl text-gray-800 dark:text-white">All Orders</h2>
//                     <span className="px-3 py-1 text-lg bg-blue-100 text-blue-600 rounded-full">{totalorder}</span>
//                 </div>

//                 <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
//                     <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                         {/* Table Header */}
//                         <thead className="bg-gray-100 dark:bg-gray-700">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                                     SL
//                                 </th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                                     Order-Created
//                                 </th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                                     Customer
//                                 </th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                                     Order-Status
//                                 </th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                                     Products
//                                 </th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                                     Total-Price
//                                 </th>
//                                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                                     Action
//                                 </th>
//                             </tr>
//                         </thead>

//                         {/* Table Body */}
//                         <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
//                             {orders?.length > 0 ? (
//                                 orders.map((or: TOrders, index: number) => {
//                                     const globalIndex = (currentPage - 1) * limit + index;
//                                     return (
//                                         <tr key={or?._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
//                                             <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200">
//                                                 {globalIndex + 1}
//                                             </td>
//                                             <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
//                                                 {formatDate(or?.createdAt)}
//                                             </td>
//                                             <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
//                                                 <div className="flex items-center gap-x-3">
//                                                     <img
//                                                         className="w-8 h-8 rounded-full"
//                                                         src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
//                                                         alt="Customer"
//                                                     />
//                                                     <div>
//                                                         <h2 className="font-medium text-gray-800 dark:text-white">
//                                                             {or?.user?.name}
//                                                         </h2>
//                                                         <p className="text-xs text-gray-500 dark:text-gray-400">
//                                                             {or?.user?.email}
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-4 text-sm text-blue-500 dark:text-blue-400">
//                                                 <UpdateOrderStatusByAdmin orderStatus={or?.status} orderId={or?._id} />
//                                             </td>
//                                             <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
//                                                 <div className="space-y-2">
//                                                     {or.products.map((product, productIndex) => (
//                                                         <div key={productIndex} className="flex items-center gap-x-2">
//                                                             <span className="font-medium">{product?.product?._id}</span>
//                                                             <span>(Qty: {product?.quantity})</span>
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
//                                                 {or?.totalPrice} TK
//                                             </td>
//                                             <td className="px-6 py-4 text-sm text-center">
//                                                 <button
//                                                     onClick={() => handleDeleteProduct(or)}
//                                                     className="text-red-500 hover:text-red-700 transition-colors"
//                                                 >
//                                                     <FaTrash className="inline-block" /> {/* React Icon */}
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     );
//                                 })
//                             ) : (
//                                 <tr>
//                                     <td colSpan={7} className="text-center py-6 text-gray-600 dark:text-gray-400">
//                                         No orders found.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Pagination */}
//                 <div className="flex items-center justify-between mt-8">
//                     <button
//                         onClick={handlePreviousPage}
//                         disabled={currentPage === 1}
//                         className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                         <FaChevronLeft className="inline-block" /> Previous {/* React Icon */}
//                     </button>
//                     <div className="flex items-center gap-x-2">
//                         {Array.from({ length: totalPage }, (_, index) => (
//                             <button
//                                 key={index + 1}
//                                 onClick={() => handlePageChange(index + 1)}
//                                 className={`px-3 py-1 text-sm rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
//                             >
//                                 {index + 1}
//                             </button>
//                         ))}
//                     </div>
//                     <button
//                         onClick={handleNextPage}
//                         disabled={currentPage === totalPage}
//                         className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                         Next <FaChevronRight className="inline-block" /> {/* React Icon */}
//                     </button>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default OrderManageAdmin;