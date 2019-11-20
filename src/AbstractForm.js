import React from "react";
import Api from "./Api.js";

class AbstractForm extends React.Component {

    constructor(props) {
        super(props);
        this.onClose = props.onClose;
        this.data = {};
    }

    render() {
        if (!this.state.display) {
            return '';
        }
        document.getElementById("mask").style.display = "block";
        return (
            <div className="btt-form">
                <h4>{this.state.model == null ? this.newRecordHeader() : this.existingRecordHeader(this.state.model)}</h4>
                <form onSubmit={this.onSubmit}>
                    {this.buildRows()}
                    {this.formButtons()}
                </form>
            </div>
        );
    }

    onSubmit = (ev) => {
        ev.preventDefault();
        if (this.state.model == null) {
            Api.connection().post(this.createUrl(), this.data)
                .then(() => window.location.reload())
                .catch(Api.alertError);
        } else {
            Api.connection().put(this.updateUrl(this.state.model), this.data)
                .then(() => window.location.reload())
                .catch(Api.alertError);
        }
    };

    onCancel = (ev) => {
        document.getElementById("mask").style.display = "none";
        this.onClose.call(this);
    };

    formButtons = () => {
        return (
            <div className="float-right">
                <button type="submit"
                        className="btn btn-success">
                    {this.state.model == null ? 'Create' : 'Save'}
                </button>
                <button type="button"
                        className="btn btn-primary"
                        onClick={(e)=>this.onCancel(e)}>
                    Cancel
                </button>
            </div>
        );
    };

    prepareValue = (name, defaultValue = null) => {
        if (this.state.model) {
            this.data[name] = this.state.model[name];
        } else {
            this.data[name] = defaultValue;
        }
        return this.data[name];
    };

    createRow = (name, label, type = 'text', required = false) => {
        let value = this.prepareValue(name);
        return (
            <div className="form-group row">
                <label htmlFor={name} className="col-sm-3 col-form-label">{label}</label>
                <div className="col-sm-9">
                    <input id={name}
                           className="form-control"
                           type={type}
                           required={required}
                           onChange={(e) => this.data[name] = e.target.value}
                           defaultValue={value}
                    />
                </div>
            </div>
        );
    };

    createDaySelectorRow = (name, label, required = false) => {
        let value = this.prepareValue(name, 1);
        return (
            <div className="form-group row">
                <label htmlFor={name} className="col-sm-3 col-form-label">{label}</label>
                <div className="col-sm-9">
                    <select name={name}
                            className="form-control"
                            required={required}
                            onChange={(e) => this.data[name] = e.target.value}
                            defaultValue={value}
                    >
                        <option value="1">Monday</option>
                        <option value="2">Tuesday</option>
                        <option value="3">Wednesday</option>
                        <option value="4">Thursday</option>
                        <option value="5">Friday</option>
                        <option value="6">Saturday</option>
                        <option value="0">Sunday</option>
                    </select>
                </div>
            </div>
        );
    };

    createDoubleFieldRow = (name1, name2, label, type = "number") => {
        let value1 = this.prepareValue(name1);
        let value2 = this.prepareValue(name2);
        if (type === 'time' && this.state.model != null) {
            value1 = value1.split("T")[1].split(":")[0] + ":" + value1.split("T")[1].split(":")[1];
            value2 = value2.split("T")[1].split(":")[0] + ":" + value2.split("T")[1].split(":")[1];
        }
        return (
            <div className="form-group row">
                <label htmlFor={name1} className="col-sm-3 col-form-label">{label}</label>
                <div className="col-sm-4">
                    <input id={name1}
                           className="form-control"
                           type={type}
                           onChange={(e) => this.data[name1] = e.target.value}
                           defaultValue={value1}
                    />
                </div>
                <div className="col-sm-4">
                    <input id={name2}
                           className="form-control"
                           type={type}
                           onChange={(e) => this.data[name2] = e.target.value}
                           defaultValue={value2}
                    />
                </div>
            </div>
        );
    };
}

export default AbstractForm;