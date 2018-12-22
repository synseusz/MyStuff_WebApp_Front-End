import React, { Component } from 'react';
import './Signup.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import CallAPI from '../../CallAPI';
import Login from '../login/Login'

class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentView: "signup",
            existingUser: "hidden"
        }
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({ currentView: "login" })
    }

    SignupSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .required('Field required'),
        password: Yup.string()
            .min(2, 'Too Short!')
            .max(16, 'Too Long!')
            .required('Field required'),
        rePassword: Yup.string()
            .min(2, 'Too Short!')
            .max(16, 'Too Long!')
            .required('Field required')
            .oneOf([Yup.ref('password'), null]),
    });


    render() {

        if (this.state.currentView === "signup") {
            return (

                <div>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            rePassword: '',
                        }}
                        validationSchema={this.SignupSchema}
                        onSubmit={values => {
                            // same shape as initial values
                            let data = {
                                email: values.email,
                                password: values.password
                            }
                            new CallAPI().addUser(data)
                                .then(response => {
                                    if (response.status === 201) {
                                        this.setState({ currentView: "registerSuccessful" })
                                    }
                                }).catch(err => {
                                    this.setState({ existingUser: "visible" })
                                })

                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className="signupForm">
                                <h1>Signup</h1>
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

                                <label htmlFor="password">Repeat Password</label>
                                <Field name="rePassword" type="password" className="input" placeholder="Repeat your password" />
                                <div className="warningArea">
                                    {errors.email && touched.email ? (
                                        <div className="warning">{errors.email}</div>
                                    ) : null}
                                </div>
                                
                                <div className="warningAreaBottom">
                                {this.state.existingUser === "visible" ? (
                                    <div><b>User already exists!</b></div>
                                ) : null
                                }
                                </div>

                                <div className="buttonsContainer">
                                    <button type="submit">Submit</button>
                                    <p>Already have account?</p>
                                    <button onClick={this.onClick} type="button" className="loginButton">Log In</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            );
        }
        else if (this.state.currentView === 'registerSuccessful') {
            return (
                <h1>Signup complete</h1>
            )
        }
        else if (this.state.currentView === 'login') {
            return (
                <Login />
            )
        }
    }
}
export default Signup;