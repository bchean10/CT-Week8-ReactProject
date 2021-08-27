import React, { Component } from 'react'
import {titleCase} from '../helpers';
import {Col, Row, Button} from 'react-bootstrap';
import {getProducts, getAllCat, getSingleCat} from '../api/apiProducts';
import ItemCard from '../components/ItemCard';
import {Redirect} from 'react-router-dom';

export default class Shop extends Component {
    constructor(){
        super();
        this.state={
            categories:[],
            products:[],
            serverErrorCategories:false,
            serverErrorProducts:false,
            tokenError:false,
            productStart:0,
            productEnd:15
        }
    }

    componentDidMount(){
        this.getAllCategories()
        this.getAllProducts()
    }

    getAllCategories=async()=>{
        const categories = await getAllCat()
        if (categories === 400){this.setState({tokenError:true})}
        if (categories === 500){this.setState({serverErrorCategories:true})}
        if (categories !== 500 && categories !== 400){this.setState({categories})
    console.log(categories)
    }
    }

    getAllProducts=async()=>{
        const products = await getProducts()
        if (products === 400){this.setState({tokenError:true})}
        if (products === 500){this.setState({serverErrorproducts:true})}
        if (products !== 500 && products !== 400){
            this.setState({products,
                            productStart:0,
                            productEnd:15,})
            console.log(products)
        }
    }

    handleCategory=async (name)=>{
        const products = await getSingleCat(name)
        if(products === 400){this.setState({tokenError:true})}
        if(products === 500){this.setState({serverErrorProducts:true})}
        if (products !== 500 && products !== 400){
            this.setState({products,
                productStart:0,
                productEnd:15,})
            }
        console.log(products)
    }

    handlePrev=()=>{
        const oldStart=this.state.productStart
        const oldEnd=this.state.productEnd
        this.setState({productStart:oldStart-15,productEnd:oldEnd-15})
    }
    
    handleNext=()=>{
        const oldStart=this.state.productStart
        const oldEnd=this.state.productEnd
        this.setState({productStart:oldStart+15,productEnd:oldEnd+15})
    }

    render() {
        const styles={
            catButton:{
                backgroundColor:"blue",
                color: 'white',
                width: '100%',
                border: '1px solid grey'
            }}
        return (
            <div>
                {this.state.serverErrorCats || this.state.serverErrorProducts?<small style={{color:"red"}}>Error, Please try again</small>:''}
                {this.state.tokenError?<Redirect to='/login'/>:''}
                {this.state.categories && this.state.products ?
                <Row>
                    <Col md={3}>
                        <center><h3>Categories</h3></center>
                        <hr/>
                        <ul style={{listStyleType:'none'}}>
                            <li><button style={styles.catButton}onClick={()=>this.getAllProducts()}>All Products</button></li>
                            {this.state.categories.map((c)=><li key={c}><button style={styles.catButton}onClick={()=>this.handleCategory(c)}>{titleCase(c)}</button></li>)}
                        </ul>
                    </Col>

                    <Col md={9}>
                        <Row>
                            {this.state.products.slice(this.state.productStart,this.state.productEnd).map((i)=><ItemCard addToCart={this.props.addToCart} product={i} key={i.id}/>)}
                        </Row>
                        <div className="d-flex justify-content-center">
                            <Button variant="danger" className={"me-2 " + (this.state.productStart===0?"disabled":'')} onClick={()=>this.handlePrev()}>{"<< Prev"}</Button>
                            <Button variant="success" className={" " + (this.state.products?.length<=this.state.productEnd?"disabled":'')} onClick={()=>this.handleNext()}>{"Next >>"}</Button>
                        </div>
                    </Col>
                </Row>
                :
                    ''
                }
            </div>
        )
    }
}
