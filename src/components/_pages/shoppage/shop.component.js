import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';

import {fetchCollectionsStartAsync} from '../../../redux/shop/shop.actions';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../../redux/shop/shop.selectors';


import CollectionsOverview from '../../collections-overview/collections-overview.component.js';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);


class ShopPage extends React.Component {
	

	componentDidMount() {
		const { fetchCollectionsStartAsync } = this.props;
		fetchCollectionsStartAsync();
		console.log('componentDidMount');
	}


		//ANCHOR: using fetch and firebase as API call:
		// fetch(
		// 	'https://firestore.googleapis.com/v1/projects/crwd-db-381d0/databases/(default)/documents/collections'
		// )
		// 	.then( response => response.json())
		// 	.then(collections => {
		// 		console.log(collections);
		// 		this.setState({ loading: false });
		// 		});
		//ANCHOR: using onSnapshot - listener
		// this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshop => {
		// 	const collectionsMap = convertCollectionsSnapshotToMap(snapshop);
		// 	updateCollections(collectionsMap);
		// 	this.setState({ loading: false })
		// });
	
	render() {
		const { match, isFetchingCollections, isCollectionsLoaded } = this.props;
		return ( 
			<div className='shop-page'>
				<Route exact path={`${match.path}`} render={ (props) => <CollectionsOverviewWithSpinner isLoading={isFetchingCollections} {...props} />}/> 
				<Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props}/>} />
			</div>
		)
	}
};

const mapStateToProps = createStructuredSelector({
	isFetchingCollections: selectIsCollectionFetching, 
	isCollectionsLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = dispatch => ({
	fetchCollectionsStartAsync: () => dispatch(
		fetchCollectionsStartAsync()
	)
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);