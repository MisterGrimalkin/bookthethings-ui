import {bake_cookie, read_cookie, delete_cookie} from 'sfcookies';
import React from 'react';

class ServiceList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            services: props.services,
            selectedServiceId: props.selectedServiceId
        };
        this.onServiceViewChanged = props.onServiceViewChanged;
    }

    static getDerivedStateFromProps(props, state) {
        return {
            services: props.services,
            selectedServiceId: props.selectedServiceId
        };
    }

    render() {
        let services = [];
        this.state.services.forEach((service, i) => {
            let isSelected = service.id===this.state.selectedServiceId;
            services.push(<Service key={i}
                                   service={service}
                                   isSelected={isSelected}
                                   onServiceViewChanged={this.onServiceViewChanged}/>);
        });
        return (
            <div className="service-list">
                <div className="service-header">Services</div>
                {services}
                <button>Create Service</button>
            </div>
        )
    }

}

class Service extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            service: props.service,
            isSelected: props.isSelected
        };
        this.onServiceViewChanged = props.onServiceViewChanged;
        this.checkBoxCookieName = "service-selected-" + this.state.service.id;
    }

    static getDerivedStateFromProps(props, state) {
        return {
            service: props.service,
            isSelected: props.isSelected
        };
    }

    render() {
        return (
            <div key={this.state.service.id}
                 className="service-block"
                 style={{
                     backgroundColor: this.state.service.color,
                     color: this.state.isSelected ? 'yellow' : 'black'
                 }}
            >
                {this.state.service.name}
                <input id={"service-selector-" + this.state.service.id}
                       type="checkbox"
                       onChange={(e) => this.handleSelect(e, this.state.service.id)}/>
            </div>
        )
    }

    handleSelect(e, id) {
        if (e.target.checked) {
            bake_cookie(this.checkBoxCookieName, "yes");
        } else {
            delete_cookie(this.checkBoxCookieName);
        }
        this.onServiceViewChanged.call(this, e.target.checked, id);
    }

    componentDidMount() {
        if (read_cookie(this.checkBoxCookieName).length > 0) {
            document.getElementById("service-selector-" + this.state.service.id).click();
        }
    }

}

export default ServiceList;
