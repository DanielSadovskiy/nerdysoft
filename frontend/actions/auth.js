import { actionTypes } from './actionTypes';
import axios from 'axios';

const baseURL = axios.create({
    baseURL: 'http://localhost:3000',
});

export const register = (nickname,email,password) => async dispatch => {
    const formData = new FormData();
    formData.append('name', nickname);
    formData.append('email', email);
    formData.append('password', password);
    console.log(nickname,email,password);
    baseURL.post('/register',formData).then(res=>{
        return res;
    })
    dispatch({ type: actionTypes.authTypes.LOGIN_USER, payload: {nickname,email} });
};

export const Logout = () => async dispatch => {
    dispatch({ type: actionTypes.authTypes.LOGOUT_USER});
};