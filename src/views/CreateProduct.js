import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {getAllCat, postProduct} from '../api/apiProducts';

const CreateProductFormSchema = Yup.object().shape({
    "title": Yup.string().required("Required"),
    "description": Yup.string().required("Required"),
    "price":Yup.string().matches(/^\d+(\.\d{1,2})?$/,"Must Be a Valid Price").required("Required"),
    "image": Yup.string().required("Required"),
    "category":Yup.string()
})

const FormInitialValues={
    title:'',
    description:'',
    price:'',
    image:'',
    category:''   
}

export default class CreateProduct extends Component {
    constructor(){
        super();
        this.state={
            serverErrorCats:false,
            categories:[],
            unsuccessfulPost:false,
            successfulPost:false
            }
    }

    componentDidMount() {
        this.getAllCats()
    }

    getAllCats=async ()=>{
        const cats=await getAllCat()
        if (cats===400){this.setState({serverErrorCats:false})}
        if (cats===500){this.setState({serverErrorCats:true})}
        if (cats !== 500 || cats !== 400){
            this.setState({categories:cats}, console.log(this.state.categories))
        }
    }

    handleSubmit=async (values)=>{
        const res = await postProduct(values)
        console.log(res)
        if (res){
            this.setState({successfulPost:true})
        }else{
            this.setState({unsuccessfulPost:true})
        }
    }

    render() {
        return (
            <div>
                {this.state.successfulPost?<small style={{color:"green"}}>Your Product Was Created</small>:""}
                {this.state.unsuccessfulPost?<small style={{color:"red"}}>Error Creating product, Please Try again</small>:""}
                {this.state.serverErrorCats?<small style={{color:"red"}}>Error try again</small>:''}      
                <br/>
                <Formik initialValues={FormInitialValues}
                validationSchema={CreateProductFormSchema}
                onSubmit={ (values, {resetForm}) => {
                    console.log(values);
                    this.handleSubmit(values);
                    resetForm(FormInitialValues)
                
                    }}
                >
                {({ errors, touched }) => (
                    <Form>
                        <label htmlFor="title" className="form-label">Product Title</label>
                        <Field name="title" className="form-control"/>
                        {errors.title && touched.title ? (<div style={{color:'red'}}>{errors.title}</div>) : null}
                        
                        <label htmlFor="description" className="form-label">Description</label>
                        <Field name="description" className="form-control"/>
                        {errors.description && touched.description ? (<div style={{color:'red'}}>{errors.description}</div>) : null}
                        
                        <label htmlFor="price" className="form-label">Price</label>
                        <Field name="price" className="form-control"/>
                        {errors.price && touched.price ? (<div style={{color:'red'}}>{errors.price}</div>) : null}
                       
                        <label htmlFor="image" className="form-label">Image Link</label>
                        <Field name="image" className="form-control"/>
                        {errors.image && touched.image ? (<div style={{color:'red'}}>{errors.image}</div>) : null}
                       
                        <label htmlFor="category" className="form-label"></label>
                        <Field as="select" name="category" className="form-select">
                            {this.state.categories?.map((c)=><option value={c} key={c}>{c}</option>)}
                        </Field>
                        {errors.category && touched.category ? (<div style={{color:'red'}}>{errors.category}</div>) : null}
                        <br/>
                        <button className="btn btn-primary form-control" type="submit">Submit</button>
                    </Form>)}
              </Formik>
            </div>
        )
    }
}