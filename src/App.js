import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './components/_pages/homepage/homepage.component';
import ShopPage from './components/_pages/shoppage/shop.component';

function App() {
  return (
		<div>
		{/* Switch displays the first one that matches the route.*/}
			<Switch>
				<Route exact path='/' component={HomePage}/>
				<Route path='/shop' component={ShopPage}/>
			</Switch>
		</div>
  )
}

export default App;
