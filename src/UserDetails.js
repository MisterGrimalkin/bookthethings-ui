import React from 'react';
import ReactDOM from 'react-dom';
import Api from './Api.js';

class UserDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', email: '', phone: ''}
    }

    render() {
        return (
            <div>
                <h1>{this.state.name}</h1>
                <h1>{this.state.email}</h1>
                <h1>{this.state.phone}</h1>
            </div>
        )
    }

    componentDidMount() {
        Api.axios().get("/services")
            .then(res => {
                this.setState({services: res.data, loading: false, error: false});
            })
            .catch(err => {
                console.log(err);
                this.setState({services: [], loading: false, error: true})
            });
    }
}
