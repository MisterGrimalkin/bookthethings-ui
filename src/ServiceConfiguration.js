import React from 'react';
import Api from './Api.js';
import ServiceList from './ServiceList.js';
import Timetable from './Timetable.js';

class ServiceConfiguration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            services: [],
            displayedServices: [],
            selectedServiceId: null,
            selectedRate: null,
            loaded: false
        };
        Api.connection().get("/services/rates")
            .then(res => {
                this.setState({services: res.data, loaded: true})
            })
            .catch(err => {
                window.alert(err);
                console.log(err.response);
            })
    }

    render() {
        let selectedServiceId = this.state.selectedServiceId;
        if (this.state.loaded) {
            return (
                <div>
                    <ServiceList
                        services={this.state.services}
                        onServiceViewChanged={this.onServiceViewChanged}
                        selectedServiceId={selectedServiceId} //{this.state.selectedServiceId}
                    />
                    <Timetable
                        data={this.state.services}
                        activeGroups={this.state.displayedServices}
                        itemKey = 'rates'
                        labelMaker = {this.labelMaker}
                        onItemSelected = {this.onTimetableItemSelect}
                        onSelectionCleared = {this.onTimetableSelectionCleared}
                    />
                </div>
            );
        } else {
            return <p>Loading Services....</p>;
        }

    }

    labelMaker = (service, rate) => {
        let costAmount = parseInt(rate.cost_amount);
        let costUnit = parseInt(rate.cost_per);
        return <p><strong>&pound;{parseInt(((costAmount / costUnit) * 60)) / 100} / hour</strong></p>;
    };

    onTimetableItemSelect = (service, rate) => {
        this.setState({selectedServiceId: service.id});
    };

    onTimetableSelectionCleared = () => {
        this.setState({selectedServiceId: null})
    };


    onServiceViewChanged = (add, serviceId) => {
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