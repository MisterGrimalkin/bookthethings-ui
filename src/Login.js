import React from 'react';
import Api from './Api.js';
import Draggable from 'react-draggable';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.email = null;
        this.password = null;
    }
    render() {
        if (Api.loggedIn()) {
            return <button onClick={e => Api.logout()}>Log Out</button>
        } else {
            return (
                <Draggable>
                    <div className="login-form">
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    Email
                                </td>
                                <td>
                                    <input id="email"
                                           type="text"
                                           onChange={e => this.email = e.target.value}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Password
                                </td>
                                <td>
                                    <input id="password"
                                           type="password"
                                           onChange={e => this.password = e.target.value}
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <button onClick={event => Api.login(this.email, this.password)}>Login</button>
                    </div>
                </Draggable>
            )
        }
    }
}

export default LoginForm;