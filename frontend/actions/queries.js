import gql from 'graphql-tag';
export const queries = {
    authTypes: {
        findUser: `
        query($nickname: String){
            userByName(where: {nickname : {_gt : $nickname}}){
            email
          }
        }
        `,
    //     REGISTER_USER: "REGISTER_USER",
    //     LOGIN_USER: "LOGIN_USER",
    //     LOGOUT_USER: "LOGOUT_USER",
    },
    
    taskQueries:{
        GET_TASKS:  gql`
        query($email: String){
            tasks(email: $email){
            title
            description
            createdFor
            createdBy
            }
        }
    `,
        // CREATE_TASK: "CREATE_TASK",
        // UPDATE_TASK: "UPDATE_TASK",
        // DELETE_TASK: "DELETE_TASK",
        // SHARE_TASK: "SHARE_TASK",
    }
  
};

