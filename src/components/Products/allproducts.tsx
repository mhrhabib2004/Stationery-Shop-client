import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllProductsQuery } from "../../redux/features/productManagement/productManagementApi";
import { useAppDispatch } from "../../redux/hooks";
import { setCartItems, TCartItem } from "../../redux/features/cart/cartSlice";
import { RootState } from "../../redux/store";
import { TProduct } from "../Types/productsManagment";
import LoadingProgress from "../pages/loadingProgress";
import { getCartItemsFromLocalStorage, saveCartItemsToLocalStorage } from "../utils/localUtils";
import { useNavigate } from "react-router-dom";
import Card from "../pages/Card";
import ViewDetails from "../pages/ViewDetailsCard";

const Products = () => {
    const { data: products, isLoading, isError } = useGetAllProductsQuery(undefined);
    const Products = products?.data;
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useAppDispatch();
    const [cartItems, setCartItemsState] = useState<TCartItem[]>([]);
    const navigate = useNavigate();

    // State for modal
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    // State for search and filters
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        brand: "",
        category: "",
        minPrice: "",
        maxPrice: "",
        model: "",
        availability: "",
    });

    // Fetch cart items from localStorage
    useEffect(() => {
        if (user) {
            const storedCartItems = getCartItemsFromLocalStorage(user.userId) || [];
            dispatch(setCartItems(storedCartItems));
            setCartItemsState(storedCartItems);
        } else {
            dispatch(setCartItems([]));
            setCartItemsState([]);
        }
    }, [user, dispatch]);

    // Save cart items to localStorage
    useEffect(() => {
        if (user) {
            saveCartItemsToLocalStorage(user.userId, cartItems);
        }
    }, [user, cartItems]);

    // Filter products based on search and filters
    const filteredProducts = Products?.filter((product: TProduct) => {
        const matchesSearchQuery =
            product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.type?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesBrand = filters.brand ? product.brand === filters.brand : true;
        const matchesCategory = filters.category ? product.type === filters.category : true;
        const matchesMinPrice = filters.minPrice ? product.price >= Number(filters.minPrice) : true;
        const matchesMaxPrice = filters.maxPrice ? product.price <= Number(filters.maxPrice) : true;
        const matchesModel = filters.model ? product.model === filters.model : true;
        const matchesAvailability = filters.availability ? product.status === filters.availability : true;

        return (
            matchesSearchQuery &&
            matchesBrand &&
            matchesCategory &&
            matchesMinPrice &&
            matchesMaxPrice &&
            matchesModel &&
            matchesAvailability
        );
    }) || [];

    // Loading and error states
    if (isLoading) return <LoadingProgress />;
    if (isError) return <div className="text-center text-red-500">Failed to fetch products. Please try again later.</div>;
    if (!Products || !Array.isArray(Products)) return <div className="text-center">No products found.</div>;

    // Limit the number of products to 6 for the home page
    const limitedProducts = Products.slice(0, 6);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6">Our Products</h1>

            {/* Search Bar */}
            <div className="mb-6 p-2 flex justify-center">
                <input
                    type="text"
                    placeholder="Search by brand, name, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="lg:w-[60%] md:w-[80%] w-[95%] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-2 mb-6">
                {[
                    { label: "Brand", key: "brand", options: ["Duranta", "Atlas", "Hero", "Phoenix", "Tata Stryder", "Avon Cycles", "BTwin", "Giant", "Cannondale", "Merida", "Suzuki", "Bajaj", "Royal"] },
                    { label: "Category", key: "category", options: ["Road", "Mountain", "Hybrid", "Electric"] },
                    { label: "Availability", key: "availability", options: ["available", "out-of-stock"] },
                ].map(({ label, key, options }) => (
                    <select
                        key={key}
                        value={filters[key]}
                        onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">{`All ${label}s`}</option>
                        {options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                ))}

                <input
                    type="number"
                    placeholder="Min Price"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Model"
                    value={filters.model}
                    onChange={(e) => setFilters({ ...filters, model: e.target.value })}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.length > 0
                    ? filteredProducts.map((product: TProduct) => (
                        <Card
                            key={product._id}
                            product={product}
                            setIsDialogOpen={setIsDialogOpen}
                            setSelectedProductId={setSelectedProductId}
                        />
                    ))
                    : limitedProducts.map((product: TProduct) => (
                        <Card
                            key={product._id}
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

            {/* View All Products Button
            <div className="text-center mt-6">
                <button
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-800 text-white text-lg font-semibold rounded-full shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-900 transition-all ease-in-out"
                    onClick={() => navigate("/all-products")} // Navigate to the full products page
                >
                    View All Products
                </button>
            </div> */}
        </div>
    );
};

export default Products;