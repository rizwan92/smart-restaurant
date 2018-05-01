import React, { Component } from 'react';
import { Container} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import VerificationForm from '../components/VerificationForm';
class VerificationPage extends Component {

  render() {
    return (
      <div style={{height:'100vh',display:'flex',flexFlow:'column',justifyContent:'center'}}>
        <Container textAlign='center'  >
          <h1>Verification Form</h1>
        </Container>
        <VerificationForm />
        <Container textAlign='center'>  <Link to="/login"> Back to Login ? </Link> </Container>
      </div>
    );
  }

}

export default VerificationPage;
