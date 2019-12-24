import { actionTypes } from './actionTypes';

export const login = ({nickname, email}) => async dispatch => {
    dispatch({ type: actionTypes.authTypes.LOGIN_USER, payload: {nickname: nickname, email: email} });
};

export const Logout = () => async dispatch => {
    dispatch({ type: actionTypes.authTypes.LOGOUT_USER});
};