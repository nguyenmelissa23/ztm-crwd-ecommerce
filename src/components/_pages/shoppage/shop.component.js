import React from 'react';
import { Route } from 'react-router';
 
import CollectionOverview from '../../collections-overview/collections-overview.component.js';
import CollectionPage from '../collection/collection.component';

import './shop.styles.scss';

const ShopPage = ({ match }) => {
	console.log('match', match)
	return ( 
		<div className='shop-page'>
			<Route exact path={`${match.path}`} component={CollectionOverview}/> 
			<Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
		</div>
	)
};

export default ShopPage;