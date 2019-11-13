import React from 'react';
import Api from './Api.js';
import ServiceList from './ServiceList.js';
import ServiceTimetable from './ServiceTimetable.js';

class ServiceConfiguration extends React.Component {
    render() {
        return (
            <div>
                <ServiceList/>
                <ServiceTimetable/>
            </div>
        );
    }

    componentDidMount() {
    }
}

export default ServiceConfiguration;