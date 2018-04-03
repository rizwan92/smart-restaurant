import React, { Component } from 'react';
import { Container, Button, Form} from 'semantic-ui-react';

class LoginForm extends Component {

  render() {
    return (
      <Container style={{width:400}}>
        <Form>
          <Form.Field>
            <label>email id </label>
            <input  name='at' placeholder='email id' />
          </Form.Field>
          <Form.Field>
            <label>password</label>
            <input type='password' placeholder='password' />
          </Form.Field>
          <Button primary fluid style={{width:100}}>Login</Button>
        </Form>
      </Container>
    );
  }

}

export default LoginForm;
