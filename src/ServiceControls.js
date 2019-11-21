import React from 'react';
import Util from './Util.js';

class ServiceControls extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedService: props.selectedService,
            selectedRate: props.selectedRate
        };
        this.onNewService = props.onNewService;
        this.onEditService = props.onEditService;
        this.onRemoveService = props.onRemoveService;
        this.onNewRate = props.onNewRate;
        this.onEditRate = props.onEditRate;
        this.onDeleteRate = props.onDeleteRate;
        this.onFillRate = props.onFillRate;
    }

    static getDerivedStateFromProps(props, state) {
        return {
            selectedService: props.selectedService,
            selectedRate: props.selectedRate
        };
    }

    render() {
        let serviceName = 'Service';
        let serviceBackground = 'green';
        let serviceButtons = [];
        let rateName = 'Rate';
        let rateButtons = [];
        serviceButtons.push(
            <button
                key="new-service"
                className="btn btn-sm btn-success"
                onClick={(e) => this.onNewService() }
            >
                New
            </button>
        );
        if (this.state.selectedService != null) {
            serviceName = this.state.selectedService.name;
            serviceBackground = this.state.selectedService.color;
            serviceButtons.push(
                <button
                    key="edit-service"
                    className="btn btn-sm btn-primary"
                    onClick={(e) => this.onEditService(this.state.selectedService)}
                >
                    Edit
                </button>
            );
            serviceButtons.push(
                <button
                    key="remove-service"
                    className="btn btn-sm btn-danger"
                    onClick={(e) => this.onRemoveService(this.state.selectedService)}
                >
                    Remove
                </button>
            );
            rateButtons.push(
                <button
                    key="new-rate"
                    className="btn btn-sm btn-success"
                    onClick={(e) => this.onNewRate(this.state.selectedService)}
                >
                    New
                </button>
            );
            if (this.state.selectedRate != null) {
                rateName = Util.rateDescription(this.state.selectedRate);
                rateButtons.push(
                    <button
                        key="edit-rate"
                        className="btn btn-sm btn-primary"
                        onClick={(e) => this.onEditRate(this.state.selectedService, this.state.selectedRate)}
                    >
                        Edit
                    </button>
                );
                rateButtons.push(
                    <button
                        key="delete-rate"
                        className="btn btn-sm btn-danger"
                        onClick={(e) => this.onDeleteRate(this.state.selectedService, this.state.selectedRate)}
                    >
                        Delete
                    </button>
                );
                rateButtons.push(
                    <button
                        key="fill-rate"
                        className="btn btn-sm btn-warning"
                        onClick={(e) => this.onFillRate(this.state.selectedService, this.state.selectedRate)}
                    >
                        Fill Week
                    </button>
                );
            }
        }
        return (
            <div>
                <div className="service-list">
                    <div className="service-header"
                         style={{backgroundColor: {serviceBackground}}}
                    >{serviceName}</div>
                    {serviceButtons}
                </div>
                <div className="service-list">
                    <div className="service-header">{rateName}</div>
                    {rateButtons}
                </div>
            </div>
        );
    }

}

export default ServiceControls;