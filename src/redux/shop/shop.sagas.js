import { takeLatest, call, put, all } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { 
	fetchCollectionsSuccess, 
	fetchCollectionsFailure
} from './shop.actions.js'

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() { 
	try { 
		const collectionRef = firestore.collection('collections');
		//get the collection that called "collections" - which is the shop data. We get a ref which is the id? 
		const snapshot = yield collectionRef.get();
		const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot); 
		yield put(fetchCollectionsSuccess(collectionsMap));
	} catch (error) {
		yield put(fetchCollectionsFailure(error.message));
	}
}

export function* fetchCollectionsStart(){
	yield takeLatest(
		ShopActionTypes.FETCH_COLLECTIONS_START,
		fetchCollectionsAsync
	);
}

export function* shopSagas(){
	yield(all([
		call(fetchCollectionsStart)
	]))
}