import React from 'react';
import Api from './Api.js';

class ServiceList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {services: [], loading: true, error: false}
    }

    render() {
        let services = [];
        if (this.state.services) {

            this.state.services.forEach((service, i) => {
                services.push(<Service key={i} service={service}/>);
            });
        }
        return (
            <div className="service-list">
                <div className="service-header">Services</div>
                {services}
                <button>Create Service</button>
            </div>
        )
    }

    componentDidMount() {
        Api.connection().get("/services")
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
        this.state = {service: props.service};
    }

    render() {
        return (
            <div key={this.state.service.id} className="service-block">
                {this.state.service.name}
                <input type="checkbox"/>
            </div>
        )
    }
}

export default ServiceList;
