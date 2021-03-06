import React, { Component } from 'react';
import { Container} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import LoginForm from '../components/LoginForm';
class LoginPage extends Component {


  render() {
    return (
      <div style={{height:'100vh',display:'flex',flexFlow:'column',justifyContent:'center'}}>
        <Container textAlign='center'  >
          <h1>Login Form </h1>
        </Container>
        <LoginForm />
        <Container textAlign='center'>  <Link to="/signup"> SignUp ?</Link> </Container>
      </div>
    );
  }

}

export default LoginPage;
