import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

//all this does is to let we know that fetching is true
export const fetchCollectionsStart = () => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
	payload: collectionsMap
});

export const fetchCollectionsFailure = (errorMessage) => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
	payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
	return dispatch => {
		const collectionRef = firestore.collection('collections');

		dispatch(fetchCollectionsStart());

		//ANCHOR: using Promise - only happen when we trigger this function.
		collectionRef.get().then(snapshop => {
			const collectionsMap = convertCollectionsSnapshotToMap(snapshop);
			dispatch(fetchCollectionsSuccess(collectionsMap));
		}).catch(error => dispatch(fetchCollectionsFailure(error.message)));
	}
}