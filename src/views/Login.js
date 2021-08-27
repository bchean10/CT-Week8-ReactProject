import React, { Component } from 'react'
import * as Yup from 'yup';
import {Formik, Form, Field} from 'formik';
import {Button} from 'react-bootstrap';
import getToken from '../api/apiBasicAuth';
import {Redirect} from 'react-router-dom';

const loginFormSchema = Yup.object().shape({
    "username":Yup.string().required("This field is required"),
    "password":Yup.string().required("This field is required")
})

const loginFormInitialValues={
    username:'',
    password:''
}

export default class Login extends Component {
    constructor(){
        super();
        this.state={
            badLogin:false,
            serverError:false,
            redirect:false
        }
    }

    handleSubmit= async ({username, password})=>{
        const token =await getToken(username, password)
        if (token === 401){return this.setState({badLogin:true, serverError:false})}
        if (token === 500){return this.setState({badLogin:false, serverError:true})}
        localStorage.setItem('token', token)
        console.log(token)
        this.props.setToken(token)
        this.setState({redirect:true})
    }

    render() {
        const styles={
            error:{color:'red'}
        }

        return (
            <div>
                {this.state.redirect ? <Redirect to={{pathname:"/", props:{token:localStorage.getItem("token")}}}/>: ""}
                <Formik initialValues={loginFormInitialValues} validationSchema={loginFormSchema} onSubmit={(values)=>{console.log(values); this.handleSubmit(values)}}>
                    {({errors, touched})=>(
                        <Form>
                            <label htmlFor="username" className="form-label">Username</label>
                            <Field name="username" className="form-control"/>
                            {errors.username && touched.username ? (<div style={styles.error}>{errors.username}</div>) : null}

                            <label htmlFor="password" className="form-label">Password</label>
                            <Field name="password" className="form-control"/>
                            {errors.password && touched.password ? (<div style={styles.error}>{errors.password}</div>) : null}

                            {this.state.badLogin ? <small style={styles.error}>Invalid Username/Password</small>:""}
                            {this.state.serverError ? <small style={styles.error}>Unexpected error, please try again.</small>:""}

                            <Button type="submit">Login</Button>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}
