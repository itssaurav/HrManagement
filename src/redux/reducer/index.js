import { combineReducers } from 'redux';
import homeReducer from './cricReducer';
const rootReducer = combineReducers({
    homeReducer:homeReducer

});
export default rootReducer;