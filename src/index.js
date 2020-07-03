import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import store from './redux/store';

import './index.css';

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Provider>,
  document.getElementById('root')
);

// Provider is from redux to store 1 single state
// Browser Router is to have different pages with certain browswer "request", review App js for specific links.

 