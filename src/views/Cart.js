import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'

export default class Cart extends Component {
    render() {
        return (
            <div>
                {Object.keys(this.props.cart).length>0 ?
            <>
                <Table stripe bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(this.props.cart).map((key)=>
                        <tr key={this.props.cart[key].id}>
                            <td>{this.props.cart[key].id}</td>
                            <td><img alt="The Product" style={{height:'100px',objectFit:"contain"}} 
                                src={this.props.cart[key].image??'https://res.cloudinary.com/dfoa3zymg/image/upload/v1629756090/E-Commerce%20Project/neon-style-coming-soon-glowing-background-design_1017-25516_yni4x1.jpg'}/></td>
                            <td>{this.props.cart[key].title??'No name'}</td>
                            <td>{this.props.cart[key].category??'No name'}</td>
                            <td>{this.props.cart[key].description??"No Description"}</td>
                            <td>${this.props.cart[key].price.toFixed(2)??'No Price'}</td>
                            <td>{this.props.cart[key].quantity??'0'}</td>
                            <td>${(this.props.cart[key].price)*(this.props.cart[key].quantity).toFixed(2)}</td>
                            <td><Button variant="danger" onClick={()=>this.props.removeFromCart(this.props.cart[key])}>Remove One</Button></td>
                            <td><Button variant="danger" onClick={()=>this.props.removeAllFromCart(this.props.cart[key])}>Remove All</Button></td>
                         </tr>
                        )
                        }
                        
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{this.props.getCartProductTotal()}</td>
                            <td>${this.props.getCartTotalPrice().toFixed(2)}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>

                </Table>
                <Button onClick={'handleCheckout'} className="float-end">Check Out</Button>
            </>
                :<h2>Your Cart is Empty</h2>}
            </div>
        )
    }
}