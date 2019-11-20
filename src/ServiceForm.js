import React from 'react';
import Api from './Api.js';

class ServiceForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            display: props.display,
            service: props.service,
        };
        this.onClose = props.onClose;
        this.data = {};
    }

    static getDerivedStateFromProps(props, state) {
        return {
            display: props.display,
            service: props.service
        };
    }

    onSubmit = (ev) => {
        ev.preventDefault();
        if (this.state.service == null) {
            Api.connection().post("/services", this.data)
                .then(() => window.location.reload())
                .catch(Api.alertError);
        } else {
            Api.connection().put("/services/" + this.state.service.id, this.data)
                .then(() => window.location.reload())
                .catch(Api.alertError);
        }
    };

    onCancel = (ev) => {
        document.getElementById("mask").style.display = "none";
        this.onClose.call(this);
    };

    render() {
        if (!this.state.display) {
            return '';
        }
        document.getElementById("mask").style.display = "block";
        return (
            <div className="btt-form">
                <h4>{this.state.service == null ? "Create Service" : "Edit '" + this.state.service.name + "'"}</h4>
                <form onSubmit={this.onSubmit}>
                    {this.createRow("name", "Name")}
                    {this.createRow("description", "Description")}
                    {this.createDoubleFieldRow("min_length", "max_length", "Length Range (minutes)")}
                    {this.createRow("booking_resolution", "Length Resolution", "number")}
                    {this.createRow("color", "Colour")}
                    <div className="float-right">
                        <button type="submit"
                                className="btn btn-success">
                            {this.state.service == null ? 'Create' : 'Save'}
                        </button>
                        <button type="button"
                                className="btn btn-primary"
                                onClick={(e)=>this.onCancel(e)}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    createRow = (name, label, type = 'text') => {
        if (this.state.service) {
            this.data[name] = this.state.service[name];
        }
        return (
            <div className="form-group row">
                <label htmlFor={name} className="col-sm-3 col-form-label">{label}</label>
                <div className="col-sm-9">
                    <input id={name}
                           className="form-control"
                           type={type}
                           onChange={(e) => this.data[name] = e.target.value}
                           defaultValue={this.data[name]}
                    />
                </div>
            </div>
        );
    }

    createDoubleFieldRow = (name1, name2, label, type = "number") => {
        if (this.state.service) {
            this.data[name1] = this.state.service[name1];
            this.data[name2] = this.state.service[name2];
        }
        return (
            <div className="form-group row">
                <label htmlFor={name1} className="col-sm-3 col-form-label">{label}</label>
                <div className="col-sm-4">
                    <input id={name1}
                           className="form-control"
                           type={type}
                           onChange={(e) => this.data[name1] = e.target.value}
                           defaultValue={this.data[name1]}
                    />
                </div>
                <div className="col-sm-4">
                    <input id={name2}
                           className="form-control"
                           type={type}
                           onChange={(e) => this.data[name2] = e.target.value}
                           defaultValue={this.data[name2]}
                    />
                </div>
            </div>
        );
    }

}

export default ServiceForm;
