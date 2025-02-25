/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useState } from "react";
import { useDeleteProductMutation, useGetAllProductsQuery } from "../../../redux/features/productManagement/productManagementApi";
import LoadingProgress from "../../pages/loadingProgress";
import { TExtraError } from "../../Types";
import { TProduct } from "../../Types/productsManagment";
import ProductModalUpdate from "./ProductModalUpdate";

const ProductsManagment = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const { data: products, isLoading, isError } = useGetAllProductsQuery([
        { name: "page", value: currentPage },
        { name: "limit", value: 6 },
    ]);

    const product = products?.data;
    const totalproduct = product?.meta?.total ?? 0;
    const totalPage = product?.meta?.totalPage ?? 1;
    const limit = products?.data?.meta?.limit ?? 6;

    const [deleteProduct] = useDeleteProductMutation();

    if (isLoading) {
        return <LoadingProgress />;
    }

    if (isError) {
        return <div className="text-center text-red-500">Failed to fetch data.</div>;
    }

    if (!product || !Array.isArray(product)) {
        return <div className="text-center text-gray-600">No products found.</div>;
    }

    // Product Delete Function
    const handleDeleteProduct = async (bi: any) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteProduct({ id: bi._id }).unwrap();
                    Swal.fire({
                        title: "Deleted!",
                        text: "The product has been deleted.",
                        icon: "success"
                    });
                } catch (error) {
                    console.error("Delete Error:", error);
                    toast.error((error as TExtraError)?.data?.message || 'Failed to delete product');
                    Swal.fire({
                        title: "Error!",
                        text: (error as TExtraError)?.data?.message || 'Failed to delete product',
                        icon: "error"
                    });
                }
            }
        });
    };

    const handleNextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <section className="container mx-auto">
                <div className="flex items-center justify-center gap-3 mb-8">
                    <h2 className="font-semibold text-3xl text-gray-800 dark:text-white">All Products</h2>
                    <span className="px-3 py-1 text-lg bg-blue-100 text-blue-600 rounded-full">{totalproduct}</span>
                </div>

                <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        {/* Table Header */}
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    SL
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Product Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Brand
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Model
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Quantity
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
                            {product.map((bi: TProduct, index: number) => {
                                const globalIndex = (currentPage - 1) * limit + index;
                                return (
                                    <tr key={bi._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200">
                                            {globalIndex + 1}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                            <div className="flex items-center gap-x-3">
                                                <img
                                                    className="w-10 h-10 rounded-lg border-2 border-blue-100"
                                                    src={bi?.image}
                                                    alt={bi?.name}
                                                />
                                                <h2 className="font-medium text-gray-800 dark:text-white">{bi?.name}</h2>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                            {bi?.brand}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                            {bi?.model}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                            {bi?.type}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                            {bi?.price}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                            {bi?.quantity}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-center">
                                            <div className="flex items-center justify-center gap-x-4">
                                                <button
                                                    onClick={() => handleDeleteProduct(bi)}
                                                    className="text-red-500 hover:text-red-700 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                                <ProductModalUpdate title="Update" product={bi} />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-8">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <div className="flex items-center gap-x-2">
                        {Array.from({ length: totalPage }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-3 py-1 text-sm rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPage}
                        className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ProductsManagment;
