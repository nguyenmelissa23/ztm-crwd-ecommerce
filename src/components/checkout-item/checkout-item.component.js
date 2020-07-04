import React from 'react';
import { connect } from 'react-redux';
import { clearItemFromCart } from '../../redux/cart/cart.action';
// import { createStructuredSelector } from 'reselect';

import './checkout.styles.scss';

const CheckoutItem = ({ cartItem, cartItem: {name, imageUrl, quantity, price}, clearItemFromCart }) => (
	<div className='checkout-item'>
		<div className='image-container'>
			<img src={imageUrl} alt='item' />
		</div>
		<span className='name'>{name}</span>
		<span className='quantity'>{quantity}</span>
		<span className='price'>{price}</span>
		<span className='remove-button' 
			onClick={ () => clearItemFromCart(cartItem) } 
		>&#10005;</span>
	</div>
)

const mapDispatchToProps = dispatch => ({
	clearItemFromCart: cartItem => dispatch(clearItemFromCart(cartItem))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);

