import React, { Component } from 'react'
import {getProduct} from '../api/apiProducts';
import ItemCard from '../components/ItemCard';

export default class SingleItem extends Component {
    constructor(){
        super();
        this.state={
            product:false
        }
    }

    componentDidMount(){
        this.getSingleProduct()
    }

    getSingleProduct = async () => {
        const product = await getProduct(this.props.match.params.id)
        if (product === 400){this.setState({tokenErro:true})}
        if (product === 500){this.setState({serverError:true})}
        if (product !== 500 && product !==400){this.setState({product})}
    }

    render() {
        return (
            <div>
                {this.state.product ?
                    <ItemCard product = {this.state.product} addToCart={this.props.addToCart}/>
                    : ''
                }
            </div>
        )
    }
}
