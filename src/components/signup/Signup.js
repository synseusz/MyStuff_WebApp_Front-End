import React, { Component } from 'react';
import './Signup.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import CallAPI from '../../CallAPI';
import { Link } from 'react-router-dom'

class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            success: false,
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
                                    this.setState({ success: true })
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
                                {this.state.success === true ? <p className="succesMsg"><b>Your account has been created! <Link to="/login" >Log In</Link></b></p> : null}
                                {this.state.existingUser === "visible" ? (
                                    <div><b>User already exists!</b></div>
                                ) : null
                                }
                            </div>

                            <div className="buttonsContainer">
                                <button type="submit">Submit</button>
                                <p>Already have account?</p>
                                <Link to="/login"><button onClick={this.onClick} className="loginButton">Log In</button></Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}

export default Signup;