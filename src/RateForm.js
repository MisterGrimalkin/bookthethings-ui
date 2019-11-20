import React from 'react'
import AbstractForm from "./AbstractForm.js";

class RateForm extends AbstractForm {

    constructor(props) {
        super(props);
        this.state = {
            display: props.display,
            model: props.model,
            service: props.service
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            display: props.display,
            model: props.model,
            service: props.service
        };
    }

    createUrl = () => {
        return "/services/" + this.state.service.id + "/rates";
    };

    updateUrl = (model) => {
        return "/services/" + this.state.service.id + "/rates/" + model.id;
    };

    newRecordHeader = () => {
        return "Create Rate for Service '" + this.state.service.name + "'";
    };

    existingRecordHeader = (model) => {
        return "Edit Rate for Service '" + this.state.service.name + "'";
    };

    buildRows = () => {
        return [
            this.createDaySelectorRow("day", "Day", true),
            this.createDoubleFieldRow("start_time", "end_time", "Times", "time"),
            this.createRow("cost_amount", "Cost Amount (pence)", "number"),
            this.createRow("cost_per", "Cost Per (minutes)", "number")
        ];
    };

}

export default RateForm;
