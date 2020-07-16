import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import CollectionsOverview from '../../collections-overview/collections-overview.component.js';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionsSnapshotToMap } from './../../../firebase/firebase.utils';

import {updateCollections} from '../../../redux/shop/shop.actions';
import WithSpinner from '../../with-spinner/with-spinner.component';

import './shop.styles.scss';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {
	state = {
		loading: true
	};

	unsubscribeFromSnapshot = null;

	componentDidMount() {
		const {updateCollections} = this.props;
		const collectionRef = firestore.collection('collections');

		//ANCHOR: using Promise - only happen when we trigger this function.
		collectionRef.get().then(snapshop => {
			const collectionsMap = convertCollectionsSnapshotToMap(snapshop);
			updateCollections(collectionsMap);
			this.setState({ loading: false })
		});

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
	}
	
	render() {
		const { match } = this.props;
		const { loading } = this.state;
		return ( 
			<div className='shop-page'>
				<Route exact path={`${match.path}`} render={ (props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />}/> 
				<Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props}/>} />
			</div>
		)
	}
};

const mapDispatchToProps = dispatch => ({
	updateCollections: collectionsMap => dispatch(
		updateCollections(collectionsMap)
	)
})

export default connect(null, mapDispatchToProps)(ShopPage);