import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { register } from './../services/user.crud';

export default class Register extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        c_password: '',
        redirect: false,
        authError: false,
        isLoading: false,
    };

    handleEmailChange = event => {
        this.setState({ email: event.target.value });
    };
    handlePwdChange = event => {
        this.setState({ password: event.target.value });
    };
    handleCPwdChange = event => {
        this.setState({ c_password: event.target.value });
    };
    handleNameChange = event => {
        this.setState({ name: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading: true});
        const email = this.state.email;
        const password = this.state.password;
        const name = this.state.name;
        const c_password = this.state.c_password;
        let bodyFormData = new FormData();
        bodyFormData.set('email', email);
        bodyFormData.set('name', name);
        bodyFormData.set('password', password);
        bodyFormData.set('c_password', c_password);
        if(password !== c_password) {
            alert('Confim password and password are not same');
            this.setState({ isLoading: false });
            return;
        }
        register(bodyFormData).then(result => {
            this.setState({isLoading: false});
            if (result.data.success) {
                this.setState({redirect: true, authError: true});
            }else {
                this.setState({redirect: false, authError: true});
            }
        }).catch(error => {
            console.log(error);
            this.setState({ authError: true, isLoading: false });
        });
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
    };

    render() {
        const isLoading = this.state.isLoading;
        return (
            <div className="container">
                <div className="card card-login mx-auto mt-5">
                    <div className="card-header">Register</div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="text" id="inputName" className="form-control" placeholder="name"  name="name" onChange={this.handleNameChange} required/>
                                    <label htmlFor="inputName">Name</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="form-label-group">
                                    <input id="inputEmail" className={"form-control " + (this.state.authError ? 'is-invalid' : '')} placeholder="Email address" type="text" name="email" onChange={this.handleEmailChange} autoFocus required/>
                                    <label htmlFor="inputEmail">Email address</label>
                                    <div className="invalid-feedback">
                                        Please provide a valid Email. or Email Exis
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="password" className="form-control" id="inputPassword" placeholder="******"  name="password" onChange={this.handlePwdChange} required/>
                                    <label htmlFor="inputPassword">Password</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="password" className="form-control" id="inputCPassword" placeholder="******"  name="c_password" onChange={this.handleCPwdChange} required/>
                                    <label htmlFor="inputCPassword">Confirm Password</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Register &nbsp;&nbsp;&nbsp;
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        <span></span>
                                    )}
                                </button>
                            </div>
                        </form>
                        <div className="text-center">
                            <Link className="d-block small mt-3" to={''}>Login Your Account</Link>
                            <Link className="d-block small" to={'#'}>Forgot Password?</Link>
                        </div>
                    </div>
                </div>
                {this.renderRedirect()}
            </div>
        );
    }
}


