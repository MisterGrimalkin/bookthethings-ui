import React from 'react';

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
        this.dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
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
        let rateName = 'Rate'
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
                rateName = this.rateDescription(this.state.selectedRate);
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
                        onClick={this.onDeleteRate(this.state.selectedService, this.state.selectedRate)}
                    >
                        Delete
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

    rateDescription = (rate) => {
        let startBits = rate.start_time.split("T")[1].split(":");
        let endBits = rate.end_time.split("T")[1].split(":");
        return (
            this.dayNames[rate.day]
            + " " + startBits[0] + ":" + startBits[1]
            + "-" + endBits[0] + ":" + endBits[1]
        );
    };

}

export default ServiceControls;