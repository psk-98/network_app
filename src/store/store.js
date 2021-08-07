import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from '../reducers/index'

const intiState = {}

const middleware = [thunk]

let store = createStore(rootReducer, intiState, composeWithDevTools(applyMiddleware(...middleware)))

export default store