import UserActionTypes from './user.types';

export const setCurrentUser = user => ({ 
	type: UserActionTypes.SET_CURRENT_USER, 
	payload: user
});

export const googleSignInStart = () => ({
	type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const signInSuccess= user => ({
	type: UserActionTypes.SIGN_IN_SUCCESS, 
	payload: user
});

export const signInFailure = error => ({
	type: UserActionTypes.SIGN_IN_SUCCESS, 
	payload: error
});

export const emailSignInStart = emailAndPassword => ({
	type: UserActionTypes.EMAIL_SIGN_IN_START, 
	payload: emailAndPassword
});

//Make sure to set the type as exactly as what the user.reducer.js / action.type would expect.