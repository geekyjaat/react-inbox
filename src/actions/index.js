import * as types from './ActionTypes';
import {
    getEmails,
    post,
    getBody
} from '../server';

export function getEmailsFromServer() {
    return async (dispatch) => {
        dispatch({ type: types.GET_EMAILS_STARTED })
        // fetch items
        const emails = await getEmails()
        // dispatch to reducers
        dispatch({
            type: types.GET_EMAILS_SUCCESS,
            emails: emails
        })
    }
}

export function postEmail(message) {
    return async (dispatch) => {
        const email = await post(message);
        dispatch({
            type: types.NEW_EMAIL_POSTED,
            email: email
        })
    }
}

export function fetchBody(id) {
    return async (dispatch) => {
        const body = await getBody(id);
        dispatch({
            type: types.BODY_RECEIVED,
            id,
            body
        })
    }
}

export const processSelectState = (emails, firstArg, secArg) => {
    return emails.every((email) => email.selected ? email.selected === firstArg : secArg)
}

export const toggleSelect = id => ({ type: types.TOGGLE_SELECT, id })
export const toggleCompose = () => ({ type: types.TOGGLE_COMPOSE })
export const toggleSelectAll = () => ({ type: types.TOGGLE_SELECT_ALL })
export const toggleReadState = readState => ({ type: types.TOGGLE_READ_STATE, readState })
export const deleteEmails = () => ({ type: types.DELETE_EMAILS })
export const manageLabels = (label, isAdd) => ({ type: types.MANAGE_LABELS, label, isAdd })
export const sendMessage = (subject, body) => ({ type: types.SEND_MAIL, subject, body })
export const toggleStar = (id, star) => ({ type: types.TOGGLE_STAR, id, star })
export const toggleBody = id => ({ type: types.TOGGLE_BODY, id })