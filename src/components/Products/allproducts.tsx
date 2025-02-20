/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector } from "react-redux";
import { useGetAllProductsQuery } from "../../redux/features/productManagement/productManagementApi";
import { useAppDispatch } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { getCartItemsFromLocalStorage, saveCartItemsToLocalStorage } from "../utils/localUtils";
import { setCartItems, TCartItem } from "../../redux/features/cart/cartSlice";
import LoadingProgress from "../pages/loadingProgress";
import { TProduct } from "../Types/productsManagment";

export default function Allproducts() {
  const { data: bicycleData, isLoading, isError } = useGetAllProductsQuery(undefined);
    const bicycle = bicycleData?.data?.result;
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useAppDispatch();
    const [cartItems, setCartItemsState] = useState<TCartItem[]>([]);

    // Fetch and set cart items from localStorage
    useEffect(() => {
        if (user) {
            const storedCartItems = getCartItemsFromLocalStorage(user.userId);
            if (storedCartItems) {
                dispatch(setCartItems(storedCartItems));
                setCartItemsState(storedCartItems);
            }
        } else {
            dispatch(setCartItems([]));
            setCartItemsState([]);
        }
    }, [user, dispatch]);

    // Save cart items to localStorage
    useEffect(() => {
        if (user && cartItems.length > 0) {
            saveCartItemsToLocalStorage(user.userId, cartItems);
        }
    }, [user, cartItems]);

    // Search and filter state
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        brand: "",
        category: "",
        minPrice: "",
        maxPrice: "",
        model: "",
        availability: "",
    });

    // Filter bicycles based on search and filters
    const filteredBicycles = bicycle?.filter((bi: TProduct) => {
        const matchesSearchQuery =
            bi.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bi.name.toLowerCase().includes(searchQuery.toLowerCase()) 
            // bi.type?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesBrand = filters.brand ? bi.brand === filters.brand : true;
        // const matchesCategory = filters.category ? bi.type === filters.category : true;
        const matchesMinPrice = filters.minPrice ? bi.price >= Number(filters.minPrice) : true;
        const matchesMaxPrice = filters.maxPrice ? bi.price <= Number(filters.maxPrice) : true;
        const matchesModel = filters.model ? bi.model === filters.model : true;
        const matchesAvailability = filters.availability ? bi.status === filters.availability : true;

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
    if (isLoading) {
        return <LoadingProgress />;
    }

    if (isError) {
        return <div>Failed to fetch data</div>;
    }

    if (!bicycle || !Array.isArray(bicycle)) {
        return <div>No products found</div>;
    }
  return (
    <div>allproducts</div>
  )
}
