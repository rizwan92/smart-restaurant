import React, { Component } from 'react';
import { Container} from 'semantic-ui-react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
class LoginPage extends Component {
  state ={
    condition:false
  }

  render() {
    return (
      <div>
        <Container textAlign='center' >
          <h1>{this.state.condition ? 'Login Form' : 'Sign Up Form'}</h1>
        </Container>
        {this.state.condition ? <LoginForm /> :   <SignUpForm />}
        <Container textAlign='right'>  <a style={{cursor:'pointer'}} onClick={()=> this.setState({condition:!this.state.condition})}>{this.state.condition ? 'Login' : 'Sign Up'}  </a> </Container>
      </div>
    );
  }

}

export default LoginPage;
