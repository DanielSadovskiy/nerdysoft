import compose from 'recompose/compose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';
import { Register } from '../components/Register';
import * as authActions from '../actions/auth'



const addUser = gql`
    mutation($nickname: String, $email: String, $password: String){
        addUser(nickname: $nickname, email: $email, password: $password){
            id 
        }
    }`;
const addUserFunction = graphql(addUser,{
    props: ({mutate})=>({
        addUser: user => mutate({
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
export default compose(addUserFunction,connect(mapStateToProps,mapDispatchToProps))(Register);
