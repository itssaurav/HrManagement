import {createStore, compose, applyMiddleware} from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import storeReducer from './reducer'
import promise from 'redux-promise'

const middlewares = [thunk,promise,logger];
const store = createStore(storeReducer, compose(
    applyMiddleware(...middlewares),
));
export default store;