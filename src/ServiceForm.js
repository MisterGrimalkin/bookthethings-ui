import React from 'react';
import AbstractForm from "./AbstractForm.js";

class ServiceForm extends AbstractForm {

    constructor(props) {
        super(props);
        this.state = {
            display: props.display,
            model: props.model,
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            display: props.display,
            model: props.model
        };
    }

    createUrl = () => {
        return "/services";
    };

    updateUrl = (model) => {
        return "/services/" + model.id;
    };

    newRecordHeader = () => {
        return "Create Service";
    };

    existingRecordHeader = (model) => {
        return "Edit Service '" + model.name + "'";
    };

    buildRows = () => {
        return [
            this.createRow("name", "Name", "text", true),
            this.createRow("description", "Description"),
            this.createDoubleFieldRow("min_length", "max_length", "Length Range (minutes)"),
            this.createRow("booking_resolution", "Length Resolution", "number"),
            this.createRow("color", "Colour", "text", true)
        ];
    };

}

export default ServiceForm;
