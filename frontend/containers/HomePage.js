import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';
import { HomePage } from '../components/HomePage';
import * as authActions from '../actions/auth';
import * as taskActions from '../actions/task';
import { TaskList } from '../components/TaskList';


const users = gql`
    query{
        users{
            id,
            nickname
        }
    }
`;

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(authActions, dispatch),
    ...bindActionCreators(taskActions, dispatch),
});
const mapStateToProps = ({auth,task}) => ({
    nickname: auth.nickname,
    email: auth.email,
    tasks: task.tasks,
});
export default compose(graphql(users),connect(mapStateToProps,mapDispatchToProps))(HomePage);
