import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import * as authApi from 'lib/api.auth';
import { pender } from 'redux-pender';
import storage from 'lib/storage';

// action types
const TOGGLE_SETTING_MENU = 'base/SHOW_SETTING_MENU';
const CHECK_LOGGED = 'base/CHECK_LOGGED';
const TEMP_LOGIN = 'base/TEMP_LOGIN';
const LOGOUT = 'base/LOGOUT';
const SHOW_MODAL = 'base/SHOW_MODAL';
const HIDE_MODAL = 'base/HIDE_MODAL';
const CHANGE_EMAIL = 'base/CHANGE_EMAIL';
const LOGIN = 'base/LOGIN';
const SET_AUTH_CHECKED = 'base/SET_AUTH_CHECKED';
const SHOW_PASSWORD_CHANGING = 'base/SHOW_PASSWORD_CHANGING';
const HIDE_PASSWORD_CHANGING = 'base/HIDE_PASSWORD_CHANGING';
const CHANGE_PASSWORD = 'base/CHANGE_PASSWORD';


// action creator
export const toggleSettingMenu = createAction(TOGGLE_SETTING_MENU);
export const checkLogged = createAction(CHECK_LOGGED, authApi.checkLogged);
export const tempLogin = createAction(TEMP_LOGIN);
export const logout = createAction(LOGOUT, authApi.logout);
export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);
export const changeEmail = createAction(CHANGE_EMAIL, authApi.changeEmail);
export const login = createAction(LOGIN, authApi.login);
export const setAuthChecked = createAction(SET_AUTH_CHECKED);
export const hidePasswordChanging = createAction(HIDE_PASSWORD_CHANGING);
export const showPasswordChanging = createAction(SHOW_PASSWORD_CHANGING);
export const changePassword = createAction(CHANGE_PASSWORD, authApi.changePassword);

// initial state
const initialState = Map({
    visible: Map({
        settingMenu: false,
        modal: false,
        passwordChanging: false
    }),
    logged: false,
    id: '',
    username: '',
    email: '',
    is_staff: false,
    user: Map({

    }),
    token: '',
    adminChecked: false
});

// reducer
export default handleActions({
    [TOGGLE_SETTING_MENU]: (state, action) => {
        const visible = state.getIn(['visible', 'settingMenu']);
        return state.setIn(['visible', 'settingMenu'], !visible);
    },
    ...pender({
        type: CHECK_LOGGED,
        onSuccess: (state, action) => {
            const { id, username, email, is_staff } = action.payload.data;
            return state.set('id', id)
                        .set('username', username)
                        .set('email', email)
                        .set('is_staff', is_staff)
                        .set('logged', true);
        }
    }),
    [TEMP_LOGIN]: (state, action) => {
        return state.set('logged', true);
    },
    [SHOW_MODAL]: (state, action) => {
        return state.setIn(['visible', 'modal'], true);
    },
    [HIDE_MODAL]: (state, action) => {
        return state.setIn(['visible', 'modal'], false);
    },
    ...pender({
        type: CHANGE_EMAIL,
        onSuccess: (state, action) => {
            const { user, token } = action.payload.data;
            const { id, username, email } = user;
            storage.set('token', token);
            return state.set('id', id)
                        .set('username', username)
                        .set('email', email)
                        .set('token', token);
        }
    }),
    ...pender({
        type: LOGIN,
        onSuccess: (state, action) => {
            const { token, user } = action.payload.data;
            storage.set('loggedInfo', user)
            storage.set('token', token);
            return state.set('user', user)
                        .set('token', token)
                        .set('username', user.username)
                        .set('email', user.email)
                        .set('is_staff', user.is_staff)
                        .set('logged', true);
        }
    }),
    [SET_AUTH_CHECKED]: (state, action) => {
        return state.set('adminChecked', true);
    },
    [SHOW_PASSWORD_CHANGING]: (state, action) => {
        return state.setIn(['visible', 'passwordChanging'], true);
    },
    [HIDE_PASSWORD_CHANGING]: (state, action) => {
        return state.setIn(['visible', 'passwordChanging'], false);
    },
    ...pender({
        type: CHANGE_PASSWORD,
        onSuccess: (state, action) => {
            const { email, id, username } = action.payload.data.user;
            return state.set('username', username)
                        .set('id', id)
                        .set('email', email)
                        .set('is_staff', false);
        }
    })
}, initialState);