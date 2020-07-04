export const addItemToCart = (cartItems, cartItemToAdd) => {
	const existingCartItem = cartItems.find(
		cartItem => cartItem.id === cartItemToAdd.id
	);

	if (existingCartItem) {
		return cartItems.map(cartItem => 
			cartItem.id === cartItemToAdd.id
			? {...cartItem, quantity: (cartItem.quantity + 1)}
			: cartItem
		)
	}

	return [...cartItems, {...cartItemToAdd, quantity: 1}]
	//everytime we add a new item, it would start with quantity = 1
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
	const currentCartItems = cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id
	);

	return [...currentCartItems]
	
};