import React, { Component } from 'react'
import {Card, Button, Col} from 'react-bootstrap'
import {titleCase} from '../helpers'
import {Redirect} from 'react-router-dom'
import TextTruncate from 'react-text-truncate';

export default class ItemCard extends Component {

    constructor(){
        super();
        this.state={
            clicked:false
        }
    }

    handleRenderProduct=()=>{
        this.setState({clicked:true})
    }

    render() {
        
        return (
            <Col>

                {this.state.clicked ? <Redirect to={`/product${this.props.product.id}`}/>:''}
                <Card style={{ width: '15rem', height:"36rem", marginBottom:"25px", marginTop:"25px" }}>
                    <Card.Img variant="top" style={{height:"100px", objectFit:"contain", marginTop:"25px"}} alt={this.props.product.title+" image"} 
                            src={this.props.product.image ?? 'https://res.cloudinary.com/dfoa3zymg/image/upload/v1629756090/E-Commerce%20Project/neon-style-coming-soon-glowing-background-design_1017-25516_yni4x1.jpg' } />
                    <Card.Body>
                        <Card.Title>{titleCase(this.props.product.title) ?? "Product"}</Card.Title><br/>
                        <Card.Subtitle style={{height:"100px"}}>
                            {this.props.product.category ?? "No Category"}
                        </Card.Subtitle>
                        <Card.Text style={{height:"50px"}}>
                            <TextTruncate line={2} element="span" truncateText="..." text={this.props.product.description?? "No Description"}/>
                        </Card.Text>
                        <Card.Subtitle className="float-end">${this.props.product.price ?? '?.??'}</Card.Subtitle><br/>
                        <button style={{backgroundColor:"white", border:'none', color:'blue'}} onClick={()=>this.handleRenderProduct()}>See More</button><br/>
                        <Button variant="primary" onClick={()=>this.props.addToCart(this.props.product)}>Add to Cart</Button>
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}