import React, { Component } from 'react';
import { Icon, Label } from 'semantic-ui-react'
class ProductTab extends Component {

  render() {
    return (
      <Label   className="product-tab" style={{height:50}}>
        <div style={{cursor:'pointer',padding:5}} onClick={()=>this.props.updateQuantity(this.props.product.id)}>{this.props.product.name}</div>
        {this.props.product.quantity === 0 ? null : <Icon name='minus' style={{cursor:'pointer',color:'red',padding:5,paddingBottom:15}} onClick={()=>this.props.reduceQuantity(this.props.product.id)}/>}
        <div >{this.props.product.quantity}</div>
        <div>{this.props.product.price} Rs</div>
      </Label>
    );
  }

}

export default ProductTab;
