import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Button, Form} from 'semantic-ui-react';
import { CognitoUserPool, CognitoUser, AuthenticationDetails, } from 'amazon-cognito-identity-js';

var poolData = {
  UserPoolId : 'ap-south-1_c6DJjMfiT',
  ClientId : '6ad236pr77ac0krk6au8i66euu'
};
var userPool = new CognitoUserPool(poolData);


class LoginForm extends Component {

  state={
    email:'',password:'',error:''
  }

  handleChange = (event) => this.setState({[event.target.name]:event.target.value})

  handleLogin = event =>{
    event.preventDefault();
    const email = this.state.email.trim();
    const password = this.state.password.trim();

    var authenticationData = {
      Username : email,
      Password : password,
    };

    var authenticationDetails = new AuthenticationDetails(authenticationData);
    var userData = {
      Username :email,
      Pool :userPool
    };
    var cognitoUser = new CognitoUser(userData);
    console.log(cognitoUser);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        console.log('access token + ' + result.getAccessToken().getJwtToken());
        AWS.config.region = 'ap-south-1';
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: 'ap-south-1:ab5439a4-78a2-4533-857e-9faf377e3c1e',
          Logins: {
            'cognito-idp.ap-south-1.amazonaws.com/ap-south-1_c6DJjMfiT':
            result.getIdToken().getJwtToken()
          }
        });

        AWS.config.credentials.get(function(err){
          if (err) {
            console.log(err);
          }

        });
      },
      onFailure: function(err) {
        console.log(err);
      },

    });
  }
  render() {
    return (
      <Container style={{width:400}}>
        <h3 style={{color:'red'}}>{this.state.error === '' ? '' : this.state.error}</h3>
        <Form onSubmit={this.handleLogin}>
          <Form.Field>
            <label>Email</label>
            <input type="email" value={this.state.email} onChange={this.handleChange.bind(this)} name="email"  placeholder='Enter Email' required/>
          </Form.Field>
          <Form.Field>
            <label>password</label>
            <input type="password" value={this.state.password} onChange={this.handleChange.bind(this)} name="password"  placeholder='Enter Password' required/>
          </Form.Field>
          <Button primary fluid style={{width:100}}>Login</Button>
        </Form>
      </Container>
    );
  }

}

export default withRouter(LoginForm);
