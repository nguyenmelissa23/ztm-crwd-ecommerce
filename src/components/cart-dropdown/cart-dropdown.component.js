import React from 'react';
import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';
import { toggleCartHidden } from '../../redux/cart/cart.action';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';


import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history, toggleCartHidden }) => (
	<div className='cart-dropdown'>
		<div className='cart-items'>
			{
				cartItems.length
				? cartItems.map(item => (<CartItem key={item.id} item={item}/>))
				: <span className='empty-message'>Your cart is empty.</span>
			}
		</div>
		<CustomButton onClick={ () => {
			toggleCartHidden();
			history.push('/checkout');
			console.log('go to checkout');
		}}>GO TO CHECKOUT</CustomButton>
	</div>
)

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems
});

const mapDispatchToProps = dispatch => ({
	toggleCartHidden: () => dispatch(toggleCartHidden())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartDropdown));