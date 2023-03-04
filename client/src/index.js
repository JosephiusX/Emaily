import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App'
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware());// 1st arg-reducers(=> fn returning an array),2nd Arg-initial state(empty object), 3rd- applyMiddleware

ReactDOM.render(
<Provider store={store}><App /></Provider>, // Provider reads changes from our redux store. 
  document.querySelector('#root')
);
