import React, { Component } from 'react';
import './Signup.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import CallAPI from '../../CallAPI';

class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentView: "signup"
        }
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        this.setState({currentView:"login"})
    }

    SignupSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        password: Yup.string()
            .min(2, 'Too Short!')
            .max(16, 'Too Long!')
            .required('Required'),
        rePassword: Yup.string()
            .min(2, 'Too Short!')
            .max(16, 'Too Long!')
            .required('Required')
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
                            this.setState({ currentView: "home" })
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

                                <label htmlFor="password">rePassword</label>
                                <Field name="rePassword" type="password" className="input" placeholder="Repeat your password" />
                                <div className="warningArea">
                                    {errors.email && touched.email ? (
                                        <div className="warning">{errors.email}</div>
                                    ) : null}
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
        else if(this.state.currentView === 'home'){
            return (
                <h1>Signup complete</h1>
            )
        }
        else if(this.state.currentView === 'login'){
            return (
                <h1>Log in</h1>
            )
        }
    }
}
export default Signup;