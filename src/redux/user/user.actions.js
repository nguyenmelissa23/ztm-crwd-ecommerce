import { UserActionTypes } from './user.types';

export const setCurrentUser = user => ({ 
	type: UserActionTypes.SET_CURRENT_USER, 
	payload: user
});



//Make sure to set the type as exactly as what the user.reducer.js / action.type would expect.