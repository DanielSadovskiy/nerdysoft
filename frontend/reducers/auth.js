import { actionTypes } from '../actions/actionTypes';

const initialState = {
    nickname: "",
    email: ""
};
export const auth = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.authTypes.LOGIN_USER:
            return {
                ...state,
                nickname: action.payload.nickname,
                email: action.payload.email,
            };
        case actionTypes.authTypes.LOGOUT_USER:
            return {
                ...state,
                nickname: "",
            };
        default:
            return state;
    }
};