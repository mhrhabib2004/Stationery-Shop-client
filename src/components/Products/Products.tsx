import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllProductsQuery } from "../../redux/features/productManagement/productManagementApi";
import Card from "../pages/Card";
import { useAppDispatch } from "../../redux/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { TProduct } from "../Types/productsManagment";
import { getCartItemsFromLocalStorage, saveCartItemsToLocalStorage } from "../utils/localUtils";
import { setCartItems } from "../../redux/features/cart/cartSlice";
import LoadingProgress from "../pages/loadingProgress";
import ViewDetails from "../pages/ViewDetailsCard";


export default function Products() {
    const { data: products, isLoading, isError } = useGetAllProductsQuery(undefined);
    const Products = products?.data;

    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useAppDispatch();
    const [cartItems, setCartItemsState] = useState<TProduct[]>([]);
    const navigate = useNavigate();

    // State for modal
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    // Fetch cart items from local storage when the user changes
    useEffect(() => {
        if (user) {
            const storedCartItems = getCartItemsFromLocalStorage(user._id);
            if (storedCartItems) {
                dispatch(setCartItems(storedCartItems));
                setCartItemsState(storedCartItems);
            }
        } else {
            dispatch(setCartItems([]));
            setCartItemsState([]);
        }
    }, [user, dispatch]);

    // Save cart items to local storage when they change
    useEffect(() => {
        if (user && cartItems.length > 0) {
            saveCartItemsToLocalStorage(user._id, cartItems);
        }
    }, [user, cartItems]);

    // Handle loading state
    if (isLoading) {
        return <LoadingProgress />;
    }

    // Handle error state
    if (isError) {
        return <div className="text-center text-red-500">Failed to fetch products. Please try again later.</div>;
    }

    // Handle no products found
    if (!Products || !Array.isArray(Products)) {
        return <div className="text-center">No products found.</div>;
    }

    // Limit the number of products to 6
    const limitedproducts = Products.slice(0, 6);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6">Our Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {limitedproducts.map((product: TProduct) => (
                    <Card
                        key={product._id} // Use product._id as key
                        product={product}
                        setIsDialogOpen={setIsDialogOpen}
                        setSelectedProductId={setSelectedProductId}
                    />
                ))}
            </div>

            {/* ViewDetails Modal */}
            {selectedProductId && (
                <ViewDetails
                    title="View Details"
                    id={selectedProductId}
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                />
            )}

            <div className="text-center mt-6">
                <button
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-800 text-white text-lg font-semibold rounded-full shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-900 transition-all ease-in-out"
                    onClick={() => navigate("/all-products")} // Navigate to the full products page
                >
                    View All Products
                </button>
            </div>
        </div>
    );
}