import React from 'react';
import Api from './Api.js';
import ServiceList from './ServiceList.js';
import ServiceControls from './ServiceControls.js';
import Timetable from './Timetable.js';
import ServiceForm from './ServiceForm.js';
import RateForm from './RateForm.js';
import Util from './Util.js';

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
                            onItemDoubleClicked={this.onTimetableItemDoubleClicked}
                            onSelectionCleared={this.onTimetableSelectionCleared}
                        />
                    </div>
                    <ServiceForm
                        model={this.state.selectedService}
                        display={this.state.editingService}
                        onClose={this.onCloseForms}
                    />
                    <RateForm
                        service={this.state.selectedService}
                        model={this.state.selectedRate}
                        display={this.state.editingRate}
                        onClose={this.onCloseForms}
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
        if (this.state.displayedServices.length == 1 && this.state.displayedServices[0] != service.id) {
            this.onServiceViewChanged(false, this.state.displayedServices[0]);
        }
        if (this.state.displayedServices.length == 0) {
            this.onServiceViewChanged(true, service.id);
        }
    };

    onServiceViewChanged = (add, serviceId) => {
        let ds = this.state.displayedServices;
        if (add && !ds.includes(serviceId)) {
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

    onTimetableItemDoubleClicked = (service, rate) => {
        this.setState({editingRate: true});
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

    onCloseForms = () => {
        this.setState({
            editingService: false,
            editingRate: false
        })
    };

    onNewService = () => {
        this.setState({
            selectedService: null,
            selectedRate: null,
            editingService: true
        });
    };

    onEditService = (service) => {
        this.setState({editingService: true});
    };

    onRemoveService = (service) => {
        let response = window.confirm("Remove service '" + service.name + "'?");
        if (response) {
            Api.connection().post("/services/remove/" + service.id)
                .then(()=>window.location.reload())
                .catch(Api.alertError);
        }
    };

    onNewRate = (service) => {
        this.setState({
            selectedRate: null,
            editingRate: true
        });
    };

    onEditRate = (service, rate) => {
        this.setState({editingRate: true});
    };

    onDeleteRate = (service, rate) => {
        let response = window.confirm(
            "Delete rate '" + Util.rateDescription(rate) + "' for service '" + service.name + "'?"
        );
        if (response) {
            Api.connection().delete("/services/" + service.id + "/rates/" + rate.id)
                .then(()=>window.location.reload())
                .catch(Api.alertError);
        }
    };

}

export default ServiceConfiguration;