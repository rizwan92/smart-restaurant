import React, { Component } from 'react';
import { Icon, Label } from 'semantic-ui-react'
class Body extends Component {

  render() {
    return (
      <Label  style={{display:'flex',width:250,height:50,justifyContent:'space-between',backgroundColor:'#ffffff',margin:5,alignItems:'center',fontSize:'1rem',userSelect:'none'}}>
        <div style={{cursor:'pointer'}} onClick={()=>this.props.updateQuantity(this.props.product.id)}>{this.props.product.name}</div>
        {this.props.product.quantity === 0 ? null : <Icon name='minus' style={{cursor:'pointer'}} onClick={()=>this.props.reduceQuantity(this.props.product.id)}/>}
        <div>{this.props.product.quantity}</div>
        <div>{this.props.product.price} Rs</div>
      </Label>
    );
  }

}

export default Body;
