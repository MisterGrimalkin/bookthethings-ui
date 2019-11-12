import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login.js';
import ServiceList from './ServiceList';

class Application extends React.Component {
    render() {
        return (
            <div>
                <Login/>
                {/*<UserDetails/>*/}
                <ServiceList/>
            </div>
        )
    }
}

ReactDOM.render(<Application/>, document.getElementById('root'));