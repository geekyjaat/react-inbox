import { combineReducers } from 'redux';
import inbox from './Inbox';
import compose from './Compose';

export default combineReducers({
    inbox,
    compose,
})