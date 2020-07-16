import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { auth, createUserProfileDocument, 
				// addCollectionAndDocuments 
				// for adding the data to firebase
				} from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
// import {selectCollectionsForPreview} from './redux/shop/shop.selectors';
// for adding the data to firebase

import HomePage from './components/_pages/homepage/homepage.component';
import ShopPage from './components/_pages/shoppage/shop.component';
import SignInAndSignUpPage from './components/_pages/sign-in-n-sign-up/sign-in-n-sign-up.component';
import Header from './components/header/header.component';
import CheckoutPage from './components/_pages/checkout/checkout.component';



import './App.css';

// changing function to Class because we need state for current user.

class App extends React.Component {

	unsubscribeFromAuth = null; 

	componentDidMount(){
		const { 
			setCurrentUser, 
			// collectionsArray 
			// for adding the data to firebase
		} = this.props;

		this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
			if (userAuth) { //if we have user authentification info
				const userRef = await createUserProfileDocument (userAuth); //we will see if it gives us back a snapshot by running createUser...
				userRef.onSnapshot(snapshot => { //at this point, we only know that the snapshot exists and has an id
					//console.log(snapshot.data()); // using .data() to actually see the information about user (name, email)
					// this.setState({
					setCurrentUser({
						id: snapshot.id,	// getting the id from the snapshot
						...snapshot.data() //and everything else
					}, () => console.log(this.props.currentUser))
				}); 
			}
			setCurrentUser(userAuth);
			// addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})))
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
