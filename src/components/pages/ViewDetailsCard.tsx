import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart, updateQuantity } from "../../redux/features/cart/cartSlice";
import { RootState } from "../../redux/store";
import { TProduct } from "../Types/productsManagment";
import LoadingProgress from "./loadingProgress";
import { useGetSingleproductQuery } from "../../redux/features/productManagement/productManagementApi";

interface TTitle {
    title: string;
    id: string;
    isDialogOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;
}

const ViewDetails = ({ title, id, isDialogOpen, setIsDialogOpen }: TTitle) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const cartItem = useAppSelector((state: RootState) => state.cart);
    const { data: bi, isLoading, isError } = useGetSingleproductQuery(id);
    const product = bi?.data as TProduct;
    const dispatch = useAppDispatch();
    const [quantity, setQuantity] = useState<number>(1);

    if (isLoading) {
        return <div><LoadingProgress /></div>;
    }

    if (isError || !product) {
        return <div>Error loading product details. Please try again later.</div>;
    }

    const { _id, image, name, brand, price, category, description, quantity: availableQuantity, inStock } = product;

    const handleIncrement = () => {
        if (quantity < availableQuantity) {
            setQuantity((prev) => prev + 1);
        } else {
            toast.error("You cannot add more than available stock.");
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleAddToCart = () => {
        if (user?.role === "admin") {
            toast.error("Admins cannot place orders.");
            return;
        }

        if (!user) {
            toast.error("You must be logged in to add to cart.");
            return;
        }

        const productInCart = cartItem.items.find((item) => item._id === _id);

        if (productInCart) {
            dispatch(updateQuantity({ id: _id, quantity }));
            toast.success("Quantity updated successfully");
            setIsDialogOpen(false);
            return;
        }

        const toastId = toast.loading("Adding to cart...");
        dispatch(
            addToCart({
                _id,
                product: _id,
                image,
                brand,
                description,
                name,
                price,
                category,
                quantity,
                inStock,
            })
        );
        toast.success("Added to cart successfully", { id: toastId, duration: 1500 });
        setIsDialogOpen(false);
    };

    return (
        <div>
            {isDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg w-full max-w-4xl shadow-lg transform scale-95 hover:scale-100 transition-all overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Product Details</h2>
                            <button onClick={() => setIsDialogOpen(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 text-xl">✖</button>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 py-4 md:py-8 rounded-md">
                            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Product Image */}
                                    <div className="md:w-1/2 w-full">
                                        <div className="h-48 sm:h-64 md:h-[400px] rounded-lg bg-gray-300 dark:bg-gray-700 overflow-hidden">
                                            <img className="w-full h-full object-cover rounded-lg transition-transform hover:scale-105" src={image} alt={name} />
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="md:w-1/2 w-full flex flex-col">
                                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2">{name}</h2>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{description}</p>

                                        {/* Price, Brand, Category */}
                                        <div className="flex flex-col gap-2">
                                            <span className="font-bold text-gray-700 dark:text-gray-300">Price: TK {price}</span>
                                            <span className="font-bold text-gray-700 dark:text-gray-300">Brand: {brand}</span>
                                            <span className="font-bold text-gray-700 dark:text-gray-300">Category: {category}</span>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-4 my-4">
                                            <button onClick={handleDecrement} className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition">-</button>
                                            <span className="text-gray-700 dark:text-white font-semibold">{quantity}</span>
                                            <button onClick={handleIncrement} className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition">+</button>
                                        </div>

                                        {/* Add to Cart and Buy Now Buttons */}
                                        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                            <button onClick={handleAddToCart} className="w-full sm:w-auto flex-1 bg-blue-800 text-white py-2 px-4 rounded-md hover:scale-105 transition">Add to Cart</button>
                                            <Link to="/customer/storermanagments" className="w-full sm:w-auto flex-1">
                                                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:scale-105 transition">Buy Now</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewDetails;