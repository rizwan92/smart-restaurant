import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Form } from 'semantic-ui-react'
import { graphql, compose } from 'react-apollo';
import AddUser  from '../graphql/mutations/AddUser';
import GetUserByEmail  from '../graphql/queries/GetUserByEmail';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
var poolData = {
  UserPoolId : 'ap-south-1_c6DJjMfiT',
  ClientId : '6ad236pr77ac0krk6au8i66euu'
};
var userPool = new CognitoUserPool(poolData);

class SignUpForm extends Component {

  state ={
    name:'',email:'',number:'',gender:'',password:'',cpassword:'',error:'',
  }

  handleChange = (event) => this.setState({[event.target.name]:event.target.value})

  handleSubmit (event){
    event.preventDefault();
    if (this.state.password !== this.state.cpassword) {
      this.setState({error:'password does not match'})
      return
    }
    const name = this.state.name.trim();
    const email = this.state.email.trim();
    const number = this.state.number.trim();
    const gender = this.state.gender.trim();
    const password = this.state.password.trim();
    var attributeList = [];
    var dataEmail = {
      Name : 'email',
      Value : email
    };
    var dataPhoneNumber = {
      Name : 'phone_number',
      Value : `+91${number}`
    };
    var dataGender = {
      Name : 'gender',
      Value : gender
    };
    var dataName = {
      Name : 'name',
      Value : name
    };
    var attributeEmail = new CognitoUserAttribute(dataEmail);
    var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);
    var attributeGender = new CognitoUserAttribute(dataGender);
    var attributeName = new CognitoUserAttribute(dataName);
    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);
    attributeList.push(attributeGender);
    attributeList.push(attributeName);
    let that = this;
    userPool.signUp(email, password, attributeList, null, function(err, result){
      if (err) {
        let myerror= err.message.split(':')
        that.setState({error:myerror[myerror.length-2]+ ' ' + myerror[myerror.length-1]})
        return;
      }
      var cognitoUser = result.user;
      that.props.history.push('/login');
    });
  }

  render() {
    const options = [
      { key: 'm', text: 'Male', value: 'male' },
      { key: 'f', text: 'Female', value: 'female' },
    ]
    return (
      <Container style={{width:400}}>
        <h3 style={{color:'red'}}>{this.state.error === '' ? '' : this.state.error}</h3>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Field>
            <label>Name</label>
            <input type="text" value={this.state.name} onChange={this.handleChange.bind(this)} name="name"  placeholder='Name' required/>
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input type="email" value={this.state.email} onChange={this.handleChange.bind(this)} name="email"  placeholder='Email' required/>
          </Form.Field>
          <Form.Field>
            <label>Contact Number</label>
            <input type="number" value={this.state.number} onChange={this.handleChange.bind(this)} name="number"  placeholder="Contact Number" required/>
          </Form.Field>
          <Form.Select fluid label='Gender' options={options} type="text" value={this.state.gender} onChange={(event,data)=>this.setState({gender:data.value})} name="gender"  placeholder='Gender' required/>
          <Form.Field>
            <label>Password</label>
            <input type="password" value={this.state.password} onChange={this.handleChange.bind(this)} name="password"  placeholder='password' required/>
          </Form.Field>
          <Form.Field>
            <label>Confirm Password</label>
            <input type="password" value={this.state.cpassword} onChange={this.handleChange.bind(this)} name="cpassword"  placeholder='Confirm Password' required/>
          </Form.Field>
          <Form.Button type="submit">Submit</Form.Button>
        </Form>
      </Container>
    );
  }
}

export default withRouter(compose(graphql(AddUser),graphql(GetUserByEmail))(SignUpForm))
