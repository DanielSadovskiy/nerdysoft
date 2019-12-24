import { actionTypes } from './actionTypes';
import { queries } from './queries';
import {HomePage} from '../components/HomePage';
import {graphql} from 'react-apollo';


export default graphql(queries.taskQueries.GET_TASKS, {
    name: 'Task',
    options: (props) => ({
        variables:  props.email 
    }),
})(HomePage)

export const setTasks = (tasks) => async dispatch => {
    dispatch({ type: actionTypes.taskTypes.SET_TASKS, payload: tasks});
};