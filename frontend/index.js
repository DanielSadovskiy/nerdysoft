import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import HomePage from './containers/HomePage';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Register from './containers/Register';
import Login from './containers/Login';
import createStore from './store';

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql'
})
const store = createStore();
const history = createBrowserHistory();

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                </Switch>
            </Router>
        </Provider>
    </ApolloProvider>,
    document.getElementById('root'),
);
