import React from 'react';
import Api from './Api.js';
import ServiceList from './ServiceList.js';
import ServiceControls from './ServiceControls.js';
import Timetable from './Timetable.js';
import ServiceForm from './ServiceForm.js';
import RateForm from './RateForm.js';

class ServiceConfiguration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            services: [],
            displayedServices: [],
            selectedService: null,
            selectedRate: null,
            // selectedServiceId: null,
            // selectedRateId: null,
            // selectedRate: null,
            loaded: false,
            editingService: false,
            editingRate: false,
            resizeTag: 0
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

    selectedService() {
        return this.state.selectedService == null ? null : this.state.selectedService;
    }

    render() {
        let selectedService = this.state.selectedService;
        let selectedRate = this.state.selectedRate;
        if (this.state.loaded) {
            return (
                <div className="row">
                    <div className="col-md-2">
                        <ServiceList
                            services={this.state.services}
                            selectedService={selectedService}
                            onServiceSelected={this.onServiceSelected}
                            onServiceViewChanged={this.onServiceViewChanged}
                        />
                        <ServiceControls
                            selectedService={selectedService}
                            selectedRate={selectedRate}
                            onNewService={this.onNewService}
                            onEditService={this.onEditService}
                            onRemoveService={this.onRemoveService}
                            onNewRate={this.onNewRate}
                            onEditRate={this.onEditRate}
                            onDeleteRate={this.onDeleteRate}
                        />
                    </div>
                    <div className="col-md-10">

                        <Timetable
                            data={this.state.services}
                            activeGroups={this.state.displayedServices}
                            selectedGroup={selectedService}
                            selectedItem={selectedRate}
                            itemKey='rates'
                            labelMaker={this.labelMaker}
                            onItemSelected={this.onTimetableItemSelected}
                            onSelectionCleared={this.onTimetableSelectionCleared}
                        />
                    </div>
                    <ServiceForm
                        service={this.state.selectedService}
                        display={this.state.editingService}
                    />
                </div>
            );
        } else {
            return <p>Loading Services....</p>;
        }

    }

    /*
            Service List
     */

    onServiceSelected = (service) => {
        this.setState({selectedService: service, selectedRate: null});
    };

    onServiceViewChanged = (add, serviceId) => {
        let ds = this.state.displayedServices;
        if (add) {
            ds.push(serviceId);
        } else {
            ds.splice(ds.indexOf(serviceId), 1);
        }
        this.setState({displayedServices: ds});
    };

    /*
            Timetable
     */

    onTimetableItemSelected = (service, rate) => {
        this.setState({selectedService: service, selectedRate: rate});
    };

    onTimetableSelectionCleared = () => {
        this.setState({selectedService: null, selectedRate: null})
    };

    labelMaker = (service, rate) => {
        let costAmount = parseInt(rate.cost_amount);
        let costUnit = parseInt(rate.cost_per);
        return <p><strong>&pound;{parseInt(((costAmount / costUnit) * 60)) / 100} / hour</strong></p>;
    };

    /*
            Forms
     */

    onNewService = () => {
        console.log("New Service");
        this.setState({editingService: true});
    };

    onEditService = (service) => {
        console.log("Edit service: " + service.id);
        this.setState({editingService: true});
    };

    onRemoveService = (service) => {
        console.log("Remove service: " + service.id);
    };

    onNewRate = (service, rate) => {
        console.log("New Rate for service " + service.id);
    };

    onEditRate = (service, rate) => {
        console.log("Edit Rate " + rate.id + " on service " + service.id);
    };

    onDeleteRate = (service, rate) => {
        console.log("Delete Rate " + rate.id + " from service " + service.id);
    };

}

export default ServiceConfiguration;