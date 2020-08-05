import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';


import HomePage from './components/_pages/homepage/homepage.component';
import ShopPage from './components/_pages/shoppage/shop.component';
import SignInAndSignUpPage from './components/_pages/sign-in-n-sign-up/sign-in-n-sign-up.component';
import Header from './components/header/header.component';
import CheckoutPage from './components/_pages/checkout/checkout.component';

import './App.css';

class App extends React.Component {

	unsubscribeFromAuth = null; 

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
		<div>
			<Header/> {/*Always display regardless of which path it is on*/}
			{/* Switch displays the first one that matches the route.*/}
			<Switch>
				<Route exact path='/' component={HomePage}/>
				<Route path='/shop' component={ShopPage}/>
				<Route exact path='/checkout' component={CheckoutPage}/>
				<Route exact path='/signin' render= {() => 
					this.props.currentUser ? 
					(<Redirect to='/' />) 
					: (<SignInAndSignUpPage/>)
				}/>
			</Switch>
		</div>
  )}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser, 
	// collectionsArray: selectCollectionsForPreview
	// for adding the data to firebase
});

const mapDispatchToProps = dispatch => ({
	setCurrentUser: user => dispatch(setCurrentUser(user))
});
//dispatch lets redux know that the object we are passing is going be an action object it is going to pass to every reducer.


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
