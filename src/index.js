import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from "redux";
import combine from "./main-store/combine";
import logger from 'redux-logger'
import thunk  from 'redux-thunk'


const store = createStore(combine, applyMiddleware(thunk, logger));

ReactDOM.render(<Provider store={store}>
    <Router/>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
