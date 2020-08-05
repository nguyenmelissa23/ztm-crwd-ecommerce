import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


import { signOutStart } from '../../redux/user/user.actions'

import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../redux/user/user.selectors.js';
import { selectCartHidden } from '../../redux/cart/cart.selectors.js'

import './header.styles.scss';
// import { toggleCartHidden } from '../../redux/cart/cart.action';

const Header = ({currentUser, hidden, signOutStart}) => (
	<div className='header'>
		<Link to='/'>
			<Logo className='logo'/>
		</Link>
		<div className='options'>
			<Link to='/shop' className='option'>SHOP</Link>
			<Link to='/contact' className='option'>CONTACT</Link>
			{
				currentUser ? 
				<div className='option' onClick={signOutStart}>SIGN OUT</div>
				: <Link to='/signin' className='option'>SIGN IN</Link>
			}
			<CartIcon/>
		</div>
		{
			hidden ? null : <CartDropdown/>
		}
	</div>
); 

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden 
});

const mapDispatchToProps = dispatch => ({
	signOutStart: () => dispatch(signOutStart())
})


export default connect(mapStateToProps, mapDispatchToProps)(Header);