import compose from 'recompose/compose';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';
import { Register } from '../components/Register';



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
export default compose(addUserFunction)(Register);
