import React, { Component } from 'react';
import { Container} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';
class SignUpPage extends Component {


  render() {
    return (
      <div style={{height:'100vh',display:'flex',flexFlow:'column',justifyContent:'center'}}>
        <Container textAlign='center'  >
          <h1>SignUp Form </h1>
        </Container>
        <SignUpForm />
        <Container textAlign='center'>  <Link to="/login"> Login ?</Link> </Container>
      </div>
    );
  }

}

export default SignUpPage;
