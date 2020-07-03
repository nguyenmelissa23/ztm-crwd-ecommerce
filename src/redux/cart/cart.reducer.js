import CartActionTypes from './cart.types'; 

import { addItemToCart } from './cart.utils';

const INITIAL_STATE = {
	hidden: true, 
	cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CartActionTypes.TOGGLE_CART_HIDDEN:
			return {
				...state, 
				hidden: !state.hidden
			}
		case CartActionTypes.ADD_ITEM:
			return {
				...state, 
				cartItems: addItemToCart(state.cartItems, action.payload)
				/* Spread Operator (...): 
				...state.cartItems = keep everythign in the cartItems array the same
				then add action.payload (which has the new item we are adding) to this array.
				So now this array look like this: [item 1, item 2, ..., item n, item n+1- just added]
				*/
			}
		case CartActionTypes.REMOVE_ITEM:
			return {
				...state,
			}
		default:
			return state
	}
}

export default cartReducer;