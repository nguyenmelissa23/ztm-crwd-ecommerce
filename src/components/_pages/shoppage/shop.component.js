import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../collections-overview/collections-overview.container.js';
import CollectionPageContainer from '../collection/collection.container';

class ShopPage extends React.Component {
	

	componentDidMount() {
		const { fetchCollectionsStart } = this.props;
		fetchCollectionsStart();
		console.log('componentDidMount');
	}

	render() {
		const { match } = this.props;
		return ( 
			<div className='shop-page'>
				<Route 
					exact 
					path={`${match.path}`} 
					component={CollectionsOverviewContainer}
				/> 
				<Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
			</div>
		)
	}
};


const mapDispatchToProps = dispatch => ({
	fetchCollectionsStart: () => dispatch(
		fetchCollectionsStart()
	)
})

export default connect(null, mapDispatchToProps)(ShopPage);



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
