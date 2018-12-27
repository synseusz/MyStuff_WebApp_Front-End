import React, { Component } from 'react';
import './Login.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import CallAPI from '../../CallAPI';
import {Link} from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentView: "login",
            wrongDetailsMsg: "hidden"
        }

        //bind
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({ currentView: "signup" })
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
                            let userData = {
                                email: values.email,
                                password: values.password
                            }

                            new CallAPI().login(userData)
                                .then(res => {
                                    if (res.status === 201) {
                                        this.setState({ currentView: "loggedin" })
                                    }
                                }).catch(err => {
                                    this.setState({ wrongDetailsMsg: "visible" })
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
                                    {errors.password && touched.password ? (
                                        <div className="warning">{errors.password}</div>
                                    ) : null}
                                </div>

                                <div className="warningAreaBottom">
                                    {this.state.wrongDetailsMsg === "visible" ? (
                                        <div><b>Wrong email or password!</b></div>
                                    ) : null
                                    }
                                </div>

                                <div className="buttonsContainer">
                                    <button type="submit">Log In</button>
                                    <p>Don't have account yet?</p>
                                    <Link to="/signup"><button onClick={this.onClick} type="button" className="loginButton">Sign Up</button></Link>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            );
        }
        else if (this.state.currentView === 'loggedin') {
            return (
                <h1>Welcome</h1>
            )
        }
    }
}
export default Login