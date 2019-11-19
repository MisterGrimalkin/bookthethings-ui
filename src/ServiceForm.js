import React from 'react';
import Api from './Api.js';

class ServiceForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            display: props.display,
            service: props.service
        };
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
        console.log(this.data);
        if ( this.state.service==null ) {
            Api.connection().post("/services", this.data)
                .then((response)=>{
                    window.location.reload();
                })
                .catch((error)=>{
                    window.alert(error);
                });
        } else {
            Api.connection().put("/services/"+this.state.service.id, this.data)
                .then((response)=>{
                    window.location.reload();
                })
                .catch((error)=>{
                    window.alert(error);
                });
        }
    };

    render() {
        if (!this.state.display) {
            return '';
        }
        console.log(this.state.service);
        document.getElementById("mask").style.display = "block";
        return (
            <div className="btt-form">
                <h4>{this.state.service == null ? "Create Service" : "Edit '" + this.state.service.name + "'"}</h4>
                <form onSubmit={this.onSubmit}>
                    {this.createRow("name", "Name")}
                    {this.createRow("description", "Description")}
                    <button id="login-button" type="submit" className="btn btn-success">
                        Save
                    </button>
                </form>
            </div>
        );
    }

    createRow = (name, label) => {
        if ( this.state.service ) {
            this.data[name] = this.state.service[name];
        }
        return (
            <div className="form-group row">
                <label htmlFor={name} className="col-sm-3 col-form-label">{label}</label>
                <div className="col-sm-9">
                    <input id={name}
                           className="form-control"
                           type="text"
                           onChange={(e) => this.data[name] = e.target.value}
                           value={this.data[name]}
                    />
                </div>
            </div>
        );

    }

}

export default ServiceForm;
