import React from 'react';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

import './checkout.styles.scss';

const CheckoutItem = ({ cartItem: {name, imageUrl, quantity, price}, removeItem }) => (
	<div className='checkout-item'>
		<div className='image-container'>
			<img src={imageUrl} alt='item' />
		</div>
		<span className='name'>{name}</span>
		<span className='quantity'>{quantity}</span>
		<span className='price'>{price}</span>
		<span className='remove-button' 
		// onClick={removeItem}
		>&#10005;</span>
	</div>
)

// const mapDispatchToProps = dispatch => {
// 	removeItem => dispatch(removeItem);
// }


export default CheckoutItem;

