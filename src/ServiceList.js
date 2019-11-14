import React from 'react';

class ServiceList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {services: props.services};
        this.onSelect = props.onSelect;
    }

    render() {
        let services = [];
        this.state.services.forEach((service, i) => {
            services.push(<Service key={i} service={service} onSelect={this.onSelect}/>);
        });
        return (
            <div className="service-list">
                <div className="service-header">Services</div>
                {services}
                <button>Create Service</button>
            </div>
        )
    }

}

class Service extends React.Component {

    constructor(props) {
        super(props);
        this.state = {service: props.service};
        this.onSelect = props.onSelect;
    }

    render() {
        return (
            <div key={this.state.service.id}
                 className="service-block"
                 style={{backgroundColor: this.state.service.color}}
            >
                {this.state.service.name}
                <input type="checkbox" onChange={(e) => this.handleSelect(e, this.state.service.id)}/>
            </div>
        )
    }

    handleSelect(e,id) {
        this.onSelect.call(this, e.target.checked, id);
    }

}

export default ServiceList;
