const userReducer = (currentState, action) => { 
	//this is the original state prior to any action
	switch (action.type){
		case 'SET_CURRENT_USER':
			return{
				...currentState,
				currentUser: action.payload
			};
		default:
			return currentState;
	}
}; // return an object with new state: currentUser{}...