import React, { Component } from 'react';
import MyHeader from '../components/MyHeader';
import Footer from '../components/Footer';
import Body from '../components/Body';
import { Segment } from 'semantic-ui-react'

class MainPage extends Component {
  state= {
    products:[
      {id:1,name:'product name', price:30,quantity:0,},
      {id:2,name:'product name1', price:40,quantity:0,},
      {id:3,name:'product name2', price:50,quantity:0,},
      {id:4,name:'product name3', price:60,quantity:0,},
      {id:5,name:'product name4', price:70,quantity:0,},
      {id:6,name:'product name5', price:80,quantity:0,},
      {id:7,name:'product name6', price:90,quantity:0,},
      {id:8,name:'product name7', price:100,quantity:0,},
      {id:9,name:'product name8', price:110,quantity:0,},
      {id:10,name:'product name9', price:120,quantity:0,},
      {id:11,name:'product name10', price:130,quantity:0,},
    ]
  }

  updateQuantity(productid){
    let newproducts = this.state.products.map((prod)=> {
      if (prod.id === productid) {
        let quanity = prod.quantity
        prod['quantity'] = quanity + 1
      }
      return prod
    })
    this.setState({products:newproducts})
  }
  reduceQuantity(productid){
    let newproducts = this.state.products.map((prod)=> {
      if (prod.id === productid) {
        let quanity = prod.quantity
        if (quanity > 0) {
          prod['quantity'] = quanity - 1
        }
      }
      return prod
    })
    this.setState({products:newproducts})
  }

  render() {
    return (
      <Segment inverted textAlign='center' vertical style={{padding:0,height:'100vh'}}>
        <MyHeader />
        {
          this.state.products.map((product,i)=>{
            return(
              <Body key={i} product={product} name="rizwan" updateQuantity={this.updateQuantity.bind(this)} reduceQuantity={this.reduceQuantity.bind(this)}/>
            )
          })
        }
        <Footer />
      </Segment>
    );
  }

}

export default MainPage;
