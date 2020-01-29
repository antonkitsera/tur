import {combineReducers} from "redux";
import {shop} from './reducer';
import {delivery} from './delivery_reducer';

export default combineReducers({
    shop,
    delivery
})
