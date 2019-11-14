import React from 'react';
import Api from './Api.js';
import ServiceList from './ServiceList.js';
import ServiceTimetable from './ServiceTimetable.js';

class ServiceConfiguration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            services: [],
            displayedServices: [],
            loaded: false
        };
        Api.connection().get("/rates")
            .then(res => {
                this.setState({services: res.data, loaded: true})
            })
            .catch(err => {
                window.alert(err);
            })
    }

    render() {
        if (this.state.loaded) {
            return (
                <div>
                    <ServiceList
                        services={this.state.services}
                        onSelect={this.handleSelect}
                    />
                    <ServiceTimetable
                        services={this.state.services}
                        displayedServices={this.state.displayedServices}
                    />
                </div>
            );
        } else {
            return <p>Loading Services....</p>;
        }
    }

    handleSelect = (add, serviceId) => {
        let ds = this.state.displayedServices;
        if (add) {
            ds.push(serviceId);
        } else {
            ds.splice(ds.indexOf(serviceId), 1);
        }
        this.setState({displayedServices: ds});
    }

}

export default ServiceConfiguration;