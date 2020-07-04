import { createSelector } from 'reselect';

// NOTE: order of code matters.
// we pass "state" to selectCartItemsCount, it refers to selectCartItems, then refers to selectCart, then to state.cart
// "Selector" helps avoid re-rendering items that does not change and only change the one that does. 
// Since now using redux, we are passing through the whole state of everything. 

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
	[selectCart], 
	(cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
	[selectCartItems], 
	cartItems => 
		cartItems.reduce((accumulatedQuality, cartItem) => 
			accumulatedQuality + cartItem.quantity, 0)
);

