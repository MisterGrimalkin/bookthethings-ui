import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const ax = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 5000,
    headers: {'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NzM2NTcwNDV9.4zYM_7ARGgbe7E2H5N2RcomNW85hOAXdjyFkd52zBls'}
});

class ServiceList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { services: [], loading: true, error: false }
    }
    render() {
        if ( this.state.loading ) {
            return <p>(fetching services)</p>
        } else if ( this.state.error ) {
            return <p>Failed to load services!</p>
        } else {
            let services = []
            this.state.services.forEach((service, i) => {
                services.push(<Service key={i} data={service}/>);
            });
            return <ul>{services}</ul>
        }
    }
    componentDidMount() {
        ax.get("http://localhost:5000/services")
            .then(res => {
                this.setState({services: res.data, loading: false, error: false});
            })
            .catch(err => {
                this.setState({services: [], loading: false, error: true})
            });
    }
}

class Service extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.data.id,
            name: props.data.name
        }
    }
    render() {
        return <li key={this.state.id}><button>{this.state.name}</button></li>
    }
}


ReactDOM.render(<ServiceList/>, document.getElementById('root'));