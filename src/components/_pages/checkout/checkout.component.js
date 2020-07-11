import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartTotal, selectCartItems } from '../../../redux/cart/cart.selectors';
import CheckoutItem from '../../checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../stripe-button/stripe-button.component.js';

import './checkout.styles.scss';

const CheckoutPage = ({cartItems, total}) => (
	<div className='checkout-page'>
		<div className='checkout-header'>
			<div className='header-block'>
				<span>Product</span>
			</div>
			<div className='header-block'>
				<span>Description</span>
			</div>
			<div className='header-block'>
				<span>Quantity</span>
			</div>	
			<div className='header-block'>
				<span>Price</span>
			</div>
			<div className='header-block'>
				<span>Remove</span>
			</div>
		</div>
		{
			cartItems.map(cartItem => { return <CheckoutItem key={cartItem.id} cartItem={cartItem}/> })
		}
		<div className='total'>TOTAL: ${total}</div>
		<div className="test-warning">
			Please use the following test credit card for payment:
			<br/>
			4242424242424242 - Visa	- Security code: Any 3 digits	- Expiration date: Any future date
		</div>
		<StripeCheckoutButton price={total}/>
	</div>
);

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems, 
	total: selectCartTotal
});

export default connect(mapStateToProps, null)(CheckoutPage);