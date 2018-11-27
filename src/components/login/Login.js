import React, { Component } from 'react';
import './Login.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import CallAPI from '../../CallAPI';
import Signup from '../signup/Signup';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentView: "login"
        }

        //bind
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        this.setState({currentView:"signup"})
    }

    LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .required('Field required!'),
        password: Yup.string()
            .min(2, 'Too Short!')
            .max(16, 'Too Long!')
            .required('Field required!'),
    });


    render() {

        if (this.state.currentView === "login") {
            return (

                <div>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={this.LoginSchema}
                        onSubmit={values => {
                            // same shape as initial values
                            let data = {
                                email: values.email,
                                password: values.password
                            }

                            new CallAPI().login(data).then(res => {
                                if(res.status === 201){
                                    this.setState({ currentView: "loggedin" })
                                }
                                else{
                                    this.setState({currentView: "notloggedin"})
                                }
                            })
                            
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className="loginForm">
                                <h1>Login</h1>
                                <label htmlFor="email">E-mail</label>
                                <Field placeholder="Enter your email address" className="input" name="email" type="email" />
                                <div className="warningArea">
                                    {errors.email && touched.email ? (
                                        <div className="warning">{errors.email}</div>
                                    ) : null}
                                </div>

                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" className="input" placeholder="Enter your pasword" />
                                <div className="warningArea">
                                    {errors.email && touched.email ? (
                                        <div className="warning">{errors.email}</div>
                                    ) : null}
                                </div>

                                <div className="buttonsContainer">
                                    <button type="submit">Log In</button>
                                    <p>Don't have account yet?</p>
                                    <button onClick={this.onClick} type="button" className="loginButton">Sign Up</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            );
        }
        else if(this.state.currentView === 'loggedin'){
            return (
                <h1>Welcome </h1>
            )
        }
        else if(this.state.currentView === 'signup'){
            return (
                <Signup />
            )
        }
        else if(this.state.currentView === 'notloggedin'){
            return (
                <h1>Wypierdalaj</h1>
            )
        }
    }
}
export default Login