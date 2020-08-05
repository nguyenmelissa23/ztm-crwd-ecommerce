import { takeLatest, call, put, all } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {
	signInSuccess, 
	signInFailure, 
	signOutSuccess,
	signOutFailure, 
	signUpSuccess, 
	signUpFailure
} from './user.actions';

import {
	auth, 
	googleProvider,
	createUserProfileDocument, 
	getCurrentUser			
} from '../../firebase/firebase.utils';

/** FUNCTIONS START */

export function* signInWithGoogle() {
	try {
		const {user} = yield auth.signInWithPopup(googleProvider);
		yield getSnapshotFromUserAuth(user);
	} catch (error){
		yield put(
			signInFailure(error)
		)
	}
}

export function* signInWithEmail({payload: { email, password}}) {
	try {
		console.log('signInWithEmail');
		const { user } = yield auth.signInWithEmailAndPassword(email, password);
		yield getSnapshotFromUserAuth(user);
	} catch (error){
		yield put(signInFailure(error));
	}
}

export function* isUserAuthenticated () { 
	try {
		const userAuth = yield getCurrentUser();
	 	if (!userAuth) return;
		yield getSnapshotFromUserAuth(userAuth);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* signOut (){ 
	try {
		yield auth.signOut();
		yield put(signOutSuccess());
	} catch (error){
		yield put(signOutFailure(error));
	}
}

export function* signUp ({payload: {email, password, displayName}}) {
	try {
			const { user } = yield auth.createUserWithEmailAndPassword(email, password);
			const userRef = yield createUserProfileDocument(user, { displayName })
			const userSnapshot = yield userRef.get();
			yield put(signUpSuccess({ id: userSnapshot.id, ...userSnapshot.data()}));
		} catch (error)  {
			console.log(error);	
			alert(error.message);
			yield put(signUpFailure(error));
		}
}

//helper functions:
export function* getSnapshotFromUserAuth(userAuth){ 
	try {
		const userRef = yield call(createUserProfileDocument, userAuth); 
		const userSnapshot = yield userRef.get();
		yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}));
		//put this back to redux flow
	} catch (error){
		yield put(signInFailure(error));
	}
}

// Listening
export function* onCheckUserSession() {
	yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onGoogleSignInStart() {
	yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart(){
	yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onSignOutStart(){
	yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* onSignUpStart(){
	yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess(){
	yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInWithEmail)
}
//export the sagas
export function* userSagas () {
	yield all ([
		call(onGoogleSignInStart), 
		call(onEmailSignInStart), 
		call(onCheckUserSession), 
		call(onSignOutStart), 
		call(onSignUpStart), 
		call(onSignUpSuccess)
	]);
}