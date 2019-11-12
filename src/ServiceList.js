import React from 'react';
import Api from './Api.js';

class ServiceList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { services: [], loading: true, error: false }
    }
    render() {
        if ( this.state.loading ) {
            return <p>(fetching services)</p>
        } else if ( this.state.error ) {
            return <p>(!error fetching services!)</p>
        } else {
            let services = []
            this.state.services.forEach((service, i) => {
                services.push(<Service key={i} data={service}/>);
            });
            return <ul>{services}</ul>
        }
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

class Service extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.data };
    }
    render() {
        return <li key={this.state.data.id} onClick={this.alertDescription}><button>{this.state.data.name}</button></li>
    }
    alertDescription = () => {
        window.alert(this.state.data.description)
    }
}

export default ServiceList;
