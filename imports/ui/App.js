import React, { Component } from 'react';
import {  Route }  from 'react-router-dom';
import MainPage from './pages/MainPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';
import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link';
import {  ApolloProvider } from 'react-apollo';
import AppSync from './AppSync';
class App extends Component {

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={MainPage} />
        <Route exact path="/admin" component={AdminPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={Signup} />
      </div>
    );
  }
}

const client = new AWSAppSyncClient({
  url: AppSync.graphqlEndpoint,
  region: AppSync.region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: AppSync.apiKey,
  }
});

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
);

export default WithProvider;
