


export const saveCartItemsToLocalStorage = (userId: string, cartItems: TCartItem[]) => {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
};

export const getCartItemsFromLocalStorage = (userId: string): TCartItem[] | null => {
    const storedCartItems = localStorage.getItem(`cart_${userId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : null;
};

export const removeCartItemsFromLocalStorage = (userId: string) => {
    localStorage.removeItem(`cart_${userId}`);
};