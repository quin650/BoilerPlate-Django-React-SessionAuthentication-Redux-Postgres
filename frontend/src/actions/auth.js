import Cookies from 'js-cookie'
import axios from 'axios';
import {
    REGISTER_SUCCESS, 
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from './types';

export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({ username, password });

    try {
        const res = await axios.post(`http://127.0.0.1:8000/accounts/login`, body, config);

        if(res.data.success){
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.username
            });

            // load the user
        } else {
            dispatch({
                type: LOGIN_FAIL,
            });
        }
    } catch(err) {
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

export const register = (username, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({ username, password, re_password });

    try {
        const res = await axios.post(`http://127.0.0.1:8000/accounts/register`, body, config);

        if (res.data.error) {
            dispatch({
                type: REGISTER_FAIL
            });
        } else {
            dispatch({
                type: REGISTER_SUCCESS
            });
        }
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL
        });
    }
};

export const logout = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({
        'withCredentials': true
    });

    try {
        const res = await axios.post(`http://127.0.0.1:8000/accounts/logout`, body, config);

        if(res.data.success){
            dispatch({
                type: LOGOUT_SUCCESS
            });
        } else {
            dispatch({
                type: LOGOUT_FAIL,
            });
        }
    } catch(err) {
        dispatch({
            type: LOGOUT_FAIL,
        });
    }
};
