import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Container,Menu, Icon,  Modal} from 'semantic-ui-react'
class MyHeader extends Component {
  state={
    modalOpen:false,
    param:0
  }

  renderModalContent(param){
    switch(param) {
    case 1:
      return <div>1</div>;
    case 2:
      return <div>2</div>;
    default:
      return <div>default</div>;
    }
  }

  redirect(target){
    this.props.history.push(target);
  }

  render() {
    return (
      <div>
        <Menu style={{height:'50px'}} >
          <Container>
            <img src="https://image.freepik.com/free-icon/twitter-logo_318-40459.jpg" style={{height:'auto',width:'50px'}} alt="icon" />
            <Menu.Item position='right'>
              <Menu.Item as='a' onClick={this.redirect.bind(this,'/')}>Home</Menu.Item>
              <Menu.Item as='a' onClick={this.redirect.bind(this,'/login')}>Log in</Menu.Item>
              <Menu.Item as='a' onClick={()=>this.setState({modalOpen:true,param:1})}>Products</Menu.Item>
            </Menu.Item>
          </Container>
        </Menu>

        <Modal open={this.state.modalOpen}>
          <Modal.Header ><Icon name="remove" style={{cursor:'pointer'}} size="large" onClick={()=>this.setState({modalOpen:false})}/></Modal.Header>
          <Modal.Content >
            {this.renderModalContent(this.state.param)}
          </Modal.Content>
        </Modal>

      </div>
    );
  }
}

export default withRouter(MyHeader);
