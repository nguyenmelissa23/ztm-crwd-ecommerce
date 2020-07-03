import { createStore, applyMiddleware } from 'redux';
// we need Middleware so that when actions get fired and dispatched, we can catch them. 
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middleware = [logger];  // this is an array.

const store = createStore(rootReducer, applyMiddleware(...middleware)); 
//can add more to this array of middleware logger.

export default store;

