import './App.css';
import {Switch, Route} from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import NavBar from './components/NavBar';
import Logout from './views/Logout';
import CreateProduct from './views/CreateProduct';
import ProductAction from './views/ProductAction';
import Cart from './views/Cart';
import Shop from './views/Shop';
import ProtectedRoute from './components/ProtectedRoute';
import SingleProduct from './views/SingleProduct';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react'


export default class App extends Component {
  constructor(){
    super();
    this.state={
      user:'',
      token:'',
      cart:{}
    }
  }
  
  static getDerivedStateFromProps=(props, state)=>{
    return {"token":localStorage.getItem('token'),
    cart:localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):{}
  }
}

setUser=(user)=>{
  this.setState({user}, ()=>console.log("User is", this.state.user));
}

setToken=(token)=>{
  this.setState({token})
}

doLogout=()=>{
  localStorage.setItem("token",'')
  this.setToken('')
}

addToCart=(product)=>{
  console.log(product)
  let cart = this.state.cart
  if (cart[product.title]){
    cart[product.title].quantity++
  }else{
    cart[product.title]={...product, quantity:1}
  }
  this.setState({cart})
  localStorage.setItem('cart',JSON.stringify(cart))
  alert(`Thanks for adding ${product.title} to your cart`)
}

removeFromCart=(product)=>{
  let cart=this.state.cart
  if (cart[product.title].quantity>1){
    cart[product.title].quantity--
  }else if(cart[product.title].quantity === 1){
    delete cart[product.title]
  }
  this.setState({cart})
  localStorage.setItem('cart',JSON.stringify(cart))
  alert(`You removed ${product.title} from your cart`)
}

removeAllFromCart=(product)=>{
  let cart=this.state.cart
  if(cart[product.title]){
    delete cart[product.title]
  }
  this.setState({cart})
  localStorage.setItem('cart',JSON.stringify(cart))  
  alert(`You Removed all of ${product.title} from your cart`)
}

getCartProductTotal=()=>{
  let total=0
  for (const product in JSON.parse(localStorage.getItem('cart'))){
    total+=JSON.parse(localStorage.getItem('cart'))[product].quantity
  }
  return total
}

getCartTotalPrice=()=>{
  let total = 0
  for (const product in JSON.parse(localStorage.getItem('cart'))){
    total +=JSON.parse(localStorage.getItem('cart'))[product].price*JSON.parse(localStorage.getItem('cart'))[product].quantity
  }
  return total
}

render() {
  return (
      <div>
        <NavBar getCartProductTotal={this.getCartProductTotal} getCartTotalPrice={this.getCartTotalPrice} token={this.state.token}/>

        <Switch>
          <ProtectedRoute token={this.state.token} exact path = "/" render={()=><Home/>}/>
          <Route token={this.state.token} exact path = "/logout" render={()=><Logout doLogout={this.doLogout}/>}/>
          <ProtectedRoute token={this.state.token} exact path = "/shop" render={()=><Shop user={this.state.user} addToCart={this.addToCart} setUser={this.setUser}/>}/>
          <ProtectedRoute token={this.state.token} exact path = "/product:id" render={(props)=><SingleProduct addToCart={this.addToCart} {...props} />}/>
          <ProtectedRoute token={this.state.token} exact path = "/cart" render={()=><Cart cart={this.state.cart} removeFromCart={this.removeFromCart} removeAllFromCart={this.removeAllFromCart} getCartProductTotal={this.getCartProductTotal} getCartTotalPrice={this.getCartTotalPrice}/>}/>

          <ProtectedRoute token={this.state.token} exact path = "/createproduct" render={()=><CreateProduct/>}/>
          <ProtectedRoute token={this.state.token} exact path = "/productaction" render={()=><ProductAction/>}/>

          <Route exact path = "/login" render={()=><Login setToken={this.setToken}/>}/>
        </Switch>
      </div>
    )
  }
}
