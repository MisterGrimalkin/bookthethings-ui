import React from 'react';
import Api from './Api.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.email = null;
        this.password = null;
        this.state = {
            error: null,
            busy: false
        }
    }

    handleSubmit = ev => {
        this.setState({busy: true});
        ev.preventDefault();
        Api.login(
            this.email,
            this.password,
            this.handleLoginError
        );
    };

    handleLoginError = (error) => {
        this.setState({
            error: 'Login error! Please check email and password',
            busy: false
        });
    };

    render() {
        let error = this.state.error != null ? <p className="error">{this.state.error}</p> : null;
        return (
            <div className="login-form">
                <fieldset disabled={this.state.busy}>
                    <h3>Book The Things</h3>
                    {error}
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                            <div className="col-sm-9">
                                <input id="email" className="form-control" type="email" required="required"
                                       onChange={e => this.email = e.target.value}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
                            <div className="col-sm-9">
                                <input id="password" className="form-control" type="password" required="required"
                                       onChange={e => this.password = e.target.value}/>
                            </div>
                        </div>
                        <p className="small">Don't have an account? Sign up here.</p>
                        <button id="login-button"
                                type="submit"
                                className="btn btn-success mb-2">
                            Login
                        </button>
                    </form>
                </fieldset>
            </div>
        )
    }
}

export default LoginForm;