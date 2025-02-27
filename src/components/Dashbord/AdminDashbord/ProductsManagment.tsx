import { toast } from "sonner";
import Swal from "sweetalert2";
import ProductModalUpdate from "./ProductModalUpdate";
import { useState } from "react";
import { useDeleteProductMutation, useGetAllProductsQuery } from "../../../redux/features/productManagement/productManagementApi";
import LoadingProgress from "../../pages/loadingProgress";
import { TExtraError } from "../../Types";
import { TProduct } from "../../Types/productsManagment";

const ProductsManagment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products using the query parameters
  const {
    data: products,
    isLoading,
    isError,
  } = useGetAllProductsQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: 6 },
    { name: "searchTerm", value: searchTerm },
  ]);

  console.log("Products API Response:", products);

  const productList = products?.data || [];
  const totalProducts = products?.meta?.total || 0;
  const totalPage = products?.meta?.totalPage || 1;
  const limit = products?.meta?.limit || 6;

  const [deleteProduct] = useDeleteProductMutation();

  if (isLoading) {
    return <LoadingProgress />;
  }

  if (isError) {
    return <div>Failed to fetch products</div>;
  }

  if (!productList || !Array.isArray(productList)) {
    return <div>No products found</div>;
  }

  // Handle product deletion
  const handleDeleteProduct = async (product: TProduct) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct({
            productId: product._id,
            body: { isDeleted: true },
          }).unwrap();
          Swal.fire({
            title: "Deleted!",
            text: "The product has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Delete Error:", error);
          toast.error(
            (error as TExtraError)?.data?.message || "Failed to delete product"
          );
          Swal.fire({
            title: "Error!",
            text:
              (error as TExtraError)?.data?.message || "Failed to delete product",
            icon: "error",
          });
        }
      }
    });
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Handle pagination
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
    <div>
      <section className="container lg:px-16 md:px-10 px-4 mx-auto min-h-screen">
        <div className="flex items-center justify-center gap-3">
          <h2 className="font-medium text-gray-800 dark:text-white text-3xl">
            All Products
          </h2>
          <span className="px-2 text-lg border-blue-500 border-2 rounded-full">
            {totalProducts}
          </span>
        </div>

        {/* Search Bar */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-10 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Product Name</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-8 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Brand
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Model
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Type
                      </th>

                      <th
                        scope="col"
                        className="px-8 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Price
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Quantity
                      </th>

                      <th
                        scope="col"
                        className="px-3 flex items-center justify-center text-center py-3.5 text-sm font-normal rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {productList.map((product: TProduct, index: number) => {
                      const globalIndex = (currentPage - 1) * limit + index;

                      return (
                        <tr key={product._id}>
                          <td className="px-10 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <div className="p-1 mr-1">{globalIndex + 1}</div>
                              <div className="flex items-center gap-x-2">
                                <img
                                  className="object-cover w-10 h-10 rounded-lg border-2 border-blue-100"
                                  src={product?.image}
                                  alt={product?.name}
                                />
                                <div>
                                  <h2 className="font-medium text-gray-800 dark:text-white">
                                    {product?.name}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-8 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                            {product?.brand}
                          </td>

                          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {product?.category}
                          </td>

                          <td className="px-8 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {product?.price}
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {product?.quantity}
                          </td>

                          <td className="px-10 py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-x-6">
                              <button
                                onClick={() => handleDeleteProduct(product)}
                                className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </button>

                              <button className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                                <ProductModalUpdate
                                  title="Update"
                                  product={product}
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 mb-10">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 rtl:-scale-x-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12l3.75-3.75"
              />
            </svg>
            Previous
          </button>

          <div className="flex items-center gap-x-3">
            {Array.from({ length: totalPage }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPage}
            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 rtl:-scale-x-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductsManagment;