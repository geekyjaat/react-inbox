import {
    SEND_MAIL,
    TOGGLE_COMPOSE
} from '../actions/ActionTypes';

import store from '../store';
import { postEmail } from '../actions';

const initialState = {
    showCompose: false
}


export default function compose(state = initialState, action) {
    switch (action.type) {
        case SEND_MAIL:
            store.dispatch(postEmail(action));
            return {
                ...state,
                showCompose: false,
            }

        case TOGGLE_COMPOSE:
            return {
                ...state,
                showCompose: !state.showCompose,
            }

        default:
            return state;
    }
}