import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {patchProduct, getProducts, deleteProduct, getAllCat} from '../api/apiProducts'
import {Button} from 'react-bootstrap'


const CreateProductFormSchema = Yup.object().shape({
    "title": Yup.string().required("Required"),
    "description": Yup.string().required("Required"),
    "price":Yup.string().matches(/^\d+(\.\d{1,2})?$/,"Must Be a Valid Price").required("Required"),
    "image": Yup.string().required("Required"),
    "category":Yup.string()
})

export default class ProductAction extends Component {
    constructor(){
        super();
        this.state={
            serverErrorCars:false,
            categories:[],
            products:[],
            product:{},
            unsuccessfulPost:false,
            successfulPost:false,
            unsuccessfulDelete:false,
            successfulDelete:false
        }
    }
    
    deleteProduct=async()=>{
        if (window.confirm(`Are you sure you warm to delete ${this.state.product.title}`)){
            const res = await deleteProduct(this.state.product.id)
            if (res){this.setState({successfulDelete:true,unsuccessfulDelete:false}); this.getAllProducts();
            }
            else{this.setState({successfulDelete:false,unsuccessfulDelete:true})
            }
        }
    }


    componentDidMount() {
        this.getAllCats()
        this.getAllItems()
    }

    getAllCats=async ()=>{
        const cats=await getAllCat()
        if (cats===400){this.setState({tokenError:true,serverErrorCats:false})}
        if (cats===500){this.setState({serverErrorCats:true, tokenError:false})}
        if (cats !== 500 || cats !== 400){
            this.setState({categories:cats}, console.log(this.state.categories))
        }
    }

    getAllProducts=async ()=>{
        const product=await getProducts()
        if (product===400){this.setState({tokenError:true,serverErrorProduct:false})}
        if (product===500){this.setState({serverErrorProduct:true, tokenError:false})}
        if (product !== 500 || product !== 400){
            this.setState({product})
        }
    }

    handleSubmit=async (values)=>{
        console.log("values: ",values)
        const res=await patchProduct({id:this.state.product.id, ...Object.fromEntries(Object.entries(values).map((e)=>e[1]!==null ? [e[0],e[1]]:[e[0],''] ))})
        console.log(res)
        if (res){
            this.setState({successfulPost:true})
        }else{
            this.setState({unsuccessfulPost:true})
        }
        this.getAllItems()
        
    }

    handlePullDown=(event)=>{
        const newId = event.target.value;
        if (newId===0){return}
        const newProduct = this.state.products.filter((li)=>li.id===parseInt(newId))[0];
        this.setState({product:newProduct});
    }

    render() {

        return (
            <div>
                {this.state.successfulDelete?<small style={{color:"green"}}>Your Item Was Deleted</small>:""}
                {this.state.unsuccessfulDelete?<small style={{color:"red"}}>Error Deleting item, Please Try again</small>:""}
                {this.state.successfulPost?<small style={{color:"green"}}>Your Item Was Modified</small>:""}
                {this.state.unsuccessfulPost?<small style={{color:"red"}}>Error Modifing item, Please Try again</small>:""}
                {this.state.serverErrorCats?<small style={{color:"red"}}>Error try again later</small>:''}      
                <br/>
                <label htmlFor="productsList" className="form-label">Choose Product to Edit</label>
                <select  id="options" name="productsList" className="form-select form-select-lg mb-3"  onChange={(event)=>this.handlePullDown(event)} > 
                    <option defaultValue={0} label="--Choose an Item--"/>
                   {this.state.products?.map((product)=><option key={product.id} value={product.id} label={product.name}/>)}
                </select>
                {Object.entries(this.state.product??{}).length>0 ?
                    <>
                        <br/>
                        <hr/>
                        <h2>#{this.state.product?.id??'000'} - {this.state.product?.name??"No Product"}</h2>
                        <Button variant="danger" onClick={()=>this.deleteProduct()}>Delete Product</Button>
                        <hr/>
                        <br/>
                        
                        <Formik initialValues={
                            {
                                name:this.state.product?.title ?? '',
                                description:this.state.product?.description??'',
                                price:this.state.product?.price??'',
                                image:this.state.product?.image?? '',
                                category:this.state.product?.category??''   
                            }
                        }
                        enableReinitialize
                        validationSchema={CreateProductFormSchema}
                        onSubmit={ (values, {resetForm}) => {
                            console.log(values);
                            this.handleSubmit(values);
                            resetForm({  title: '',
                                description:'',
                                price:'',
                                image: '',
                                category: ''   
                            })
                        
                            }}
                        >
                        {({ errors, touched }) => (
                            <Form>
                                <label htmlFor="title" className="form-label">Product Title</label>
                                <Field name="title" className="form-control"/>
                                {errors.product && touched.product ? (<div style={{color:'red'}}>{errors.product}</div>) : null}
                                
                                <label htmlFor="description" className="form-label">Description</label>
                                <Field name="description" className="form-control"/>
                                {errors.description && touched.description ? (<div style={{color:'red'}}>{errors.description}</div>) : null}
                                
                                <label htmlFor="price" className="form-label">Price</label>
                                <Field name="price" className="form-control"/>
                                {errors.price && touched.price ? (<div style={{color:'red'}}>{errors.price}</div>) : null}
                            
                                <label htmlFor="image" className="form-label">Image Link</label>
                                <Field name="image" className="form-control"/>
                                {errors.image && touched.image ? (<div style={{color:'red'}}>{errors.image}</div>) : null}
                            
                                <label htmlFor="category_id" className="form-label"></label>
                                <Field as="select" name="category_id" className="form-select">
                                    {this.state.categories?.map((c)=><option value={c} key={c}>{c}</option>)}
                                </Field>
                                {errors.category_id && touched.category_id ? (<div style={{color:'red'}}>{errors.category_id}</div>) : null}

                                <button className="btn btn-primary form-control" type="submit">Submit</button>
                            </Form>)}
                    </Formik>
                </>
                :
                ''}
            </div>
        )
    }
}