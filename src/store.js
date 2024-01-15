import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import postReducer from './reducer';

const store = createStore(postReducer, applyMiddleware(thunk));

export default store;
