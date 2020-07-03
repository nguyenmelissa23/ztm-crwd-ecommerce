import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import HomePage from './components/_pages/homepage/homepage.component';
import ShopPage from './components/_pages/shoppage/shop.component';
import SignInAndSignUpPage from './components/_pages/sign-in-n-sign-up/sign-in-n-sign-up.component';
import Header from './components/header/header.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

// changing function to Class because we need state for current user.

class App extends React.Component {
	// constructor() {
	// 	super ();

	// 	this.state = {
	// 		currentUser: null,
	// 	}
	// }
	unsubscribeFromAuth = null; 

	componentDidMount(){
		this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
			if (userAuth) { //if we have user authentification info
				const userRef = await createUserProfileDocument (userAuth); //we will see if it gives us back a snapshot by running createUser...
				userRef.onSnapshot(snapshot => { //at this point, we only know that the snapshot exists and has an id
					//console.log(snapshot.data()); // using .data() to actually see the information about user (name, email)
					// this.setState({
					this.props.setCurrentUser({
						id: snapshot.id,	// getting the id from the snapshot
						...snapshot.data() //and everything else
					}, () => console.log(this.state))
				}); 
			}
			this.props.setCurrentUser(userAuth);
		});
	}

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
				<Route path='/signin' component={SignInAndSignUpPage}/>
			</Switch>
		</div>
  )}
}

const mapDispatchToProps = dispatch => ({
	setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
