import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions'

import HomePage from './components/_pages/homepage/homepage.component';
import ShopPage from './components/_pages/shoppage/shop.component';
import SignInAndSignUpPage from './components/_pages/sign-in-n-sign-up/sign-in-n-sign-up.component';
import Header from './components/header/header.component';
import CheckoutPage from './components/_pages/checkout/checkout.component';

import './App.css';

const App = ({ checkUserSession, currentUser} ) => {

	useEffect(() => {
		checkUserSession();
	}, [checkUserSession] );
	// pass empty array [] as an argument if we only want this to happen once. But pass CheckUserSession as we know it is not going to change. 

	return (
		<div>
			<Header/> {/*Always display regardless of which path it is on*/}
			{/* Switch displays the first one that matches the route.*/}
			<Switch>
				<Route exact path='/' component={HomePage}/>
				<Route path='/shop' component={ShopPage}/>
				<Route exact path='/checkout' component={CheckoutPage}/>
				<Route exact path='/signin' render={() => currentUser? 
					(<Redirect to='/' />) 
					: (<SignInAndSignUpPage/>)
				}/>
			</Switch>
		</div>
  )
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser, 
});

const mapDispatchToProps = dispatch => ({
	checkUserSession: () => dispatch(checkUserSession())
})

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(App);
