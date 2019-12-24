const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString,GraphQLID, GraphQLInt, GraphQLSchema, GraphQLList} = graphql;
const user = require('../models/user');
const task = require('../models/task');
const ObjectId = require('mongoose').Types.ObjectId; 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash')
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        nickname: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        tasks: {
            type: TaskType, 
            resolve(parent,args){
                return tasks.find({"user":parent.email});
            }
        }
    })
})
const AuthPayLoad = new GraphQLObjectType({
    name: "AuthPayload",
    fields: () =>({
        token: {type: GraphQLString}
    })
})
const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        createdBy: {type:GraphQLString},
        createdFor: {type: GraphQLString}
    })
})
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields : {
        addUser: {
            type: UserType,
            args: {
                nickname: { type: GraphQLString},
                email: { type: GraphQLString},
                password: {type: GraphQLString}
                 
            },
            resolve(parent,args){
                const newUser = new user({
                    nickname: args.nickname,
                    email: args.email,
                    password: args.password
                });
                return newUser.save();
            }
        },
        loginUser: {
            type: AuthPayLoad,
            args: {
                email: { type: GraphQLString},
                password: {type: GraphQLString}
            },
            async resolve(parent,args){
                const currUser = await user.findOne({"email":args.email});
                if(await bcrypt.compare(args.password, currUser.password)) {
                    const SECRET_KEY = "secretKey"
                    let token = await jwt.sign({name: currUser.nickname, email: currUser.email,test: "123123"}, SECRET_KEY ,{ expiresIn: '24h' });
                    return {token: token};
                }
                return null;
            }
        },
        addTask: {
            type: TaskType,
            args: {
                title: { type: GraphQLString},
                description: { type: GraphQLString},
                createdBy: {type: GraphQLString},
                createdFor: {type: GraphQLString}
                 
            },
            resolve(parent,args){
                const newTask= new task({
                    title: args.title,
                    description: args.description,
                    createdBy: args.createdBy,
                    createdFor: args.user
                });
                return newTask.save();
            }
        },
    }
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type:  UserType,
            args: {email: { type: GraphQLString}},
            resolve(parent,args){
                return user.findOne({"email":args.email})
            }
        },
        userByName: {
            type:  GraphQLList(UserType),
            args: {nickname: { type: GraphQLString}},
            resolve(parent,args){
                // return user.find(user => item.nickname === "nazar")
            }
        },
       
        users:{
            type: GraphQLList(UserType),
            resolve(parent,args){
                return user.find({})
            }
        },
        tasks:{
            type: GraphQLList(TaskType),
            args: {email: { type: GraphQLString}},
            resolve(parent,args){
                return task.find({"createdFor":args.email})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:Query,
    mutation:Mutation
})