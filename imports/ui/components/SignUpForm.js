import React, { Component } from 'react';
import { Container, Form } from 'semantic-ui-react'
import { graphql } from 'react-apollo';
import AddUser  from '../graphql/mutations/AddUser';
import uuidV4 from 'uuid/v4'

class SignUpForm extends Component {

  state ={
    name:'',email:'',number:'',gender:'',password:'',cpassword:''
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
    const createdAt = new Date().getTime().toString();
    const user = {
      id: uuidV4(),
      name,
      email,
      number,
      gender,
      password,
      createdAt,
      type:'admin'
    }
    this.props.AddUser(user);

  }

  render() {
    const options = [
      { key: 'm', text: 'Male', value: 'male' },
      { key: 'f', text: 'Female', value: 'female' },
    ]
    return (
      <Container style={{width:400}}>
        <h2>{this.state.error === '' ? '' : this.state.error}</h2>
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

export default graphql(AddUser,{
  props:props=>({
    AddUser: user => {
      return props.mutate({
        variables:user,
        optimisticResponse: () => ({
          result:user
        })
      }).then(res => console.log(res.data.result))
    }
  })
})(SignUpForm);
