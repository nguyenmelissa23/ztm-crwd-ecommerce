import { createStore, applyMiddleware } from 'redux';
// we need Middleware so that when actions get fired and dispatched, we can catch them. 
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer';

const middleware = [];  // this is an array.

//NOTE: only apply to development and not deployment
if (process.env.NODE_ENV === 'development'){
	middleware.push(logger);
}

//else, we are not using any logger


export const store = createStore(rootReducer, applyMiddleware(...middleware)); 
//can add more to this array of middleware logger.

export const persistor = persistStore(store);

export default { store, persistor };

