import axios from 'axios';
import * as actionTypes from './actions';
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: console.error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDT2WNnvcSLoERWoKN1CiDYqLva-VQ-YIE';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDT2WNnvcSLoERWoKN1CiDYqLva-VQ-YIE';
        }
        axios.post(url, authData)
        .then(response => {
            console.log("done");
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.userId));
        })
        .catch(err => {
            console.log("not" );
            console.log(err);
            dispatch(authFail(err));
        });
    };
};

