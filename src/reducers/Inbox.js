import {
    GET_EMAILS_STARTED,
    GET_EMAILS_SUCCESS,
    TOGGLE_SELECT,
    TOGGLE_READ_STATE,
    TOGGLE_SELECT_ALL,
    DELETE_EMAILS,
    MANAGE_LABELS,
    NEW_EMAIL_POSTED,
    TOGGLE_STAR,
    TOGGLE_BODY,
    BODY_RECEIVED
} from '../actions/ActionTypes';
import { processSelectState, fetchBody } from '../actions';
import { patch } from '../server';
import store from '../store';

const initialState = {
    emails: [],
    showSpinner: false
}

const getSelectedIds = (state) => {
    const ids = state.emails.filter(e => e.selected).map(e => e.id);
    return ids;
}

export default function inbox(state = initialState, action) {
    switch (action.type) {
        case GET_EMAILS_STARTED:
            return {
                ...state,
                showSpinner: true
            }
        case GET_EMAILS_SUCCESS:
            return {
                ...state,
                showSpinner: false,
                emails: state.emails.concat(action.emails),
            }

        case TOGGLE_SELECT:
            return {
                ...state,
                emails: state.emails.map((email) => {
                    if (email.id === action.id) {
                        const newEmail = {
                            ...email,
                            selected: !email.selected
                        }
                        return newEmail;
                    }
                    return email
                }),
            }

        case TOGGLE_READ_STATE:
            const selectedIds = getSelectedIds(state);
            patch({
                messageIds: selectedIds,
                command: "read",
                read: action.readState
            })
            return {
                ...state,
                emails: state.emails.map((email) => {
                    if (email.selected) {
                        const newEmail = {
                            ...email,
                            read: action.readState
                        }
                        return newEmail;
                    }
                    return email
                })
            }

        case TOGGLE_SELECT_ALL:
            const allSelected = processSelectState(state.emails, true, false)
            const noneSelected = processSelectState(state.emails, false, true)
            let selectFlag = false;
            if (allSelected)
                selectFlag = false;
            else if (noneSelected)
                selectFlag = true;
            else
                selectFlag = true;
            return {
                ...state,
                emails: state.emails.map((email) => {
                    const newEmail = {
                        ...email,
                        selected: selectFlag
                    }
                    return newEmail;
                })
            }

        case DELETE_EMAILS:
            const toBeDeleted = getSelectedIds(state);
            patch({
                messageIds: toBeDeleted,
                command: 'delete'
            });
            return {
                ...state,
                emails: state.emails.filter((email) => !email.selected)
            }

        case MANAGE_LABELS:
            const impactedIds = getSelectedIds(state);
            patch({
                messageIds: impactedIds,
                command: action.isAdd ? 'addLabel' : 'removeLabel',
                label: action.label
            });
            return {
                ...state,
                emails: state.emails.map((email) => {
                    if (email.selected
                        && Array.isArray(email.labels)) {
                        const index = email.labels.indexOf(action.label);
                        if (action.isAdd) {
                            if (index === -1) {
                                email.labels.push(action.label);
                                const newEmail = {
                                    ...email,
                                    labels: email.labels
                                }
                                return newEmail;
                            }
                        } else {
                            if (index > -1) {
                                email.labels.splice(index, 1)
                                const newEmail = {
                                    ...email,
                                    labels: email.labels
                                }
                                return newEmail;
                            }
                        }
                    }
                    return email
                })
            }

        case NEW_EMAIL_POSTED:
            return {
                ...state,
                emails: [
                    ...state.emails,
                    action.email,
                ]
            }

        case TOGGLE_STAR:
            // save star to server
            patch({
                messageIds: [action.id],
                command: 'star',
                star: !action.star
            })

            // update state
            return {
                ...state,
                emails: state.emails.map((email) => {
                    if (email.id === action.id) {
                        const newEmail = {
                            ...email,
                            starred: !email.starred
                        }
                        return newEmail;
                    }
                    return email
                }),
            }

        case TOGGLE_BODY:
            const email = state.emails.find(e => e.id === action.id);
            if (email.showBody) {
                return {
                    ...state,
                    emails: state.emails.map((email) => {
                        if (email.id === action.id) {
                            const newEmail = {
                                ...email,
                                showBody: false
                            }
                            return newEmail;
                        }
                        return email
                    }),
                }
            } else {
                store.dispatch(fetchBody(action.id));
                return state;
            }

        case BODY_RECEIVED:
            return {
                ...state,
                emails: state.emails.map((email) => {
                    if (email.id === action.id) {
                        const newEmail = {
                            ...email,
                            showBody: true,
                            body: action.body
                        }
                        return newEmail;
                    }
                    return email
                }),
            }


        default:
            return state;
    }
}