import React from 'react';
import { connect } from 'react-redux';
import { addItem, clearItemFromCart, removeItem } from '../../redux/cart/cart.action';
// import { createStructuredSelector } from 'reselect';

import './checkout.styles.scss';

const CheckoutItem = ({ 
	cartItem, 
	cartItem: {name, imageUrl, quantity, price}, 
	clearItemFromCart,  
	removeItem, 
	addItemToCart
}) => (
	<div className='checkout-item'>
		<div className='image-container'>
			<img src={imageUrl} alt='item' />
		</div>
		<span className='name'>{name}</span>
		<span className='quantity'>
			<div className='arrow'
				onClick={ () => removeItem(cartItem) }
			>&#10094;</div>
			<span className='value'>{quantity}</span>
			<div className='arrow'
				onClick={ () =>  addItemToCart(cartItem)}	
				
			>&#10095;</div>
		</span>
		<span className='price'>{price}</span>
		<span className='remove-button' 
			onClick={ () => clearItemFromCart(cartItem) } 
		>&#10005;</span>
	</div>
)

const mapDispatchToProps = dispatch => ({
	clearItemFromCart: cartItem => dispatch(clearItemFromCart(cartItem)), 
	removeItem: cartItem => dispatch(removeItem(cartItem)), 
	addItemToCart: cartItem => dispatch(addItem(cartItem))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);

