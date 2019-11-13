import React from 'react';
import Api from './Api.js';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.email = null;
        this.password = null;
    }

    render() {
        return (
            <div className="login-form">
                <h1>Book The Things</h1>
                <table>
                    <tbody>
                    <tr>
                        <td className="login-label">
                            Email
                        </td>
                        <td className="login-field">
                            <input id="email" type="text"
                                   onChange={e => this.email = e.target.value}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="login-label">
                            Password
                        </td>
                        <td className="login-field">
                            <input id="password" type="password"
                                   onChange={e => this.password = e.target.value}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>

                <button onClick={e => Api.login(this.email, this.password)}>Login</button>
            </div>
        )
    }
}

export default LoginForm;