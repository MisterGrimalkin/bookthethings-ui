import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login.js';
import Api from './Api.js';
import TopBar from './TopBar.js';
import MainPanel from './MainPanel.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class Application extends React.Component {
    render() {
        return (
            <div>
                <TopBar/>
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

