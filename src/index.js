import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login.js';
import Api from './Api.js';
import UserDetails from './UserDetails.js';
import MainPanel from './MainPanel.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import BSTest from './BSTest.js';
import Button from 'react-bootstrap/Button';

class Application extends React.Component {
    render() {
        return (
            <div>
                {/*<BSTest/>*/}
                <UserDetails/>
                <MainPanel/>
            </div>
        )
    }
}

Api.init();
if ( Api.loggedIn() ) {
    ReactDOM.render(<Application/>, document.getElementById('root'));
    Api.loadUser();
} else {
    ReactDOM.render(<Login/>, document.getElementById('root'));
}

