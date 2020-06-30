import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './components/_pages/homepage/homepage.component';
import ShopPage from './components/_pages/shoppage/shop.component';
import SignInAndSignUpPage from './components/_pages/sign-in-n-sign-up/sign-in-n-sign-up.component';
import Header from './components/header/header.component';
import {auth} from './firebase/firebase.utils';

// changing function to Class because we need state for current user.

class App extends React.Component {
	constructor() {
		super ();

		this.state = {
			currentUser: null,
		}
	}
	
	unsubscribeFromAuth = null; 

	componentDidMount(){
		this.unsubscribeFromAuth = auth.onAuthStateChanged( user => {
			this.setState({currentUser: user});
			console.log(user);
		});
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
		<div>
			<Header currentUser={this.state.currentUser}/> {/*Always display regardless of which path it is on*/}
			{/* Switch displays the first one that matches the route.*/}
			<Switch>
				<Route exact path='/' component={HomePage}/>
				<Route path='/shop' component={ShopPage}/>
				<Route path='/signin' component={SignInAndSignUpPage}/>
			</Switch>
		</div>
  )}
}

export default App;
