import { actionTypes } from '../actions/actionTypes';

const initialState = {
    tasks: [],
};
export const task = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.taskTypes.SET_TASKS:
            return {
                ...state,
                tasks: action.payload,
            }
        case actionTypes.taskTypes.CREATE_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            };
        default:
            return state;
    }
};