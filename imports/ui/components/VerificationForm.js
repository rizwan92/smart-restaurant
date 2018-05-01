import React, { Component } from 'react';
import { Container, Form } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

class VerificationForm extends Component {
  state = {
    code:'',
    resend:'',
    vrerr:'',
  }

  handleChange = (event) => this.setState({[event.target.name]:event.target.value})


  confirmSubmit (event){
    event.preventDefault();
    this.setState({resend:''})
    const email = this.state.email.trim();
    const code = this.state.code.trim();
    if (email === '') {
      this.setState({resend:'',vrerr:'please enter your email'})
    }
    var userData = {
      Username :email,
      Pool :userPool
    };
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      this.setState({resend:result,vrerr:''})
    });
  }
  resendCode(){
    const email = this.props.match.params.email.trim();
    if (email === '') {
      this.setState({resend:'',vrerr:'please enter your email'})
    }
    var userData = {
      Username :email,
      Pool :userPool
    };
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.resendConfirmationCode(function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      console.log('call result: ' + result);
      this.setState({resend:result,vrerr:''})
    });
  }


  render() {
    return (
      <Container style={{width:400}}>
        <Form onSubmit={this.confirmSubmit}>
          <Form.Field>
            <label>Verification Code</label>
            <input type="text" value={this.state.code} onChange={this.handleChange.bind(this)} name="code"  placeholder='Enter Code' required/>
          </Form.Field>
          <Form.Button type="submit" primary>Verify</Form.Button>
        </Form>
        <h3 style={{color:'blue'}}>{this.state.resend === '' ? '' : this.state.resend}</h3>
        <h3 style={{color:'blue'}}>{this.state.vrerr === '' ? '' : this.state.vrerr}</h3>
        <Container textAlign='center'>  <a style={{cursor:'pointer'}} onClick={this.resendCode.bind(this)}> Resend code?</a> </Container>
      </Container>
    );
  }

}

export default withRouter(VerificationForm);
