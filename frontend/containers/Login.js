import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {gql} from 'apollo-boost';
import compose from 'recompose/compose';
import {graphql} from 'react-apollo';
import { Login } from '../components/Login';
import * as authActions from '../actions/auth'


const login = gql`
    mutation($email: String, $password: String){
        loginUser(email: $email, password: $password){
            token
        }
    }
    `;
const loginUserFunction = graphql(login,{
    props: ({mutate})=>({
        loginUser: user => mutate({
            variables: user
        })
    })
})
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(authActions, dispatch),
});
const mapStateToProps = (auth) => ({
    nickname: auth.nickname,
});
export default compose(loginUserFunction,connect(mapStateToProps,mapDispatchToProps))(Login);
