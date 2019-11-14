import React from 'react';

class ServiceTimetable extends React.Component {

    constructor(props) {
        super(props);
        this.positions = {};
        this.state = {
            services: props.services,
            displayedServices: props.displayedServices
        };
    }

    render() {
        let rows = [];
        for (var i = 0; i < 24; i++) {
            rows.push(this.createRow(i));
        }
        let rateBlocks = [];
        this.state.services.forEach((service) => {
            let display = this.state.displayedServices.includes(service.id);
            service.rates.forEach((rate) => {
                rateBlocks.push(<div
                    id={"s"+service.id+"r"+rate.id}
                    key={"s"+service.id+"r"+rate.id}
                    style={{backgroundColor: service.color, display: (display ? 'block' : 'none')}}
                    className="rate-block"
                    onClick={e => window.alert(service.description) }
                >
                    <strong>&pound;{this.calculateHourlyRate(rate)}/hr</strong>
                </div>)
            });
        });
        return (
            <div id="timetable"
                 ref={el=>{this.storePos("timetable", el)}}
                 className="service-timetable"
            >
                <table cellSpacing={0}>
                    <thead>
                    <tr>
                        <th className="time-col">&nbsp;</th>
                        {this.createCol(1, "Monday")}
                        {this.createCol(2, "Tuesday")}
                        {this.createCol(3, "Wednesday")}
                        {this.createCol(4, "Thursday")}
                        {this.createCol(5, "Friday")}
                        {this.createCol(6, "Saturday")}
                        {this.createCol(0, "Sunday")}
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
                {rateBlocks}
            </div>
        );
    }

    createCol(day, dayName) {
        return (
            <th key={day} ref={el => {
                this.storePos("day" + day, el)
            }} className="day-col">{dayName}</th>
        )
    }

    createRow(hour) {
        return(
            <tr key={hour} className="hour-row">
                <td style={{border: "none"}} className="hour-label" ref={el => this.storePos("hour" + hour, el)}>
                    {hour}:00
                </td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
        )
    }

    calculateHourlyRate(rate) {
        let costAmount = parseInt(rate.cost_amount);
        let costUnit = parseInt(rate.cost_per);
        return parseInt(((costAmount / costUnit) * 60)) / 100;
    }

    storePos(key, element) {
        if (element != null) {
            this.positions[key] = {
                x: element.offsetLeft,
                y: element.offsetTop,
                w: element.offsetWidth,
                h: element.offsetHeight
            };
        }
    }

    positionBlock(service, rate) {
        let blockId = "s"+service.id+"r"+rate.id
        let blockElement = document.getElementById(blockId);
        let timetable = {
            x: this.positions.timetable.x,
            y: this.positions.timetable.y
        };
        blockElement.style.left = (timetable.x + this.positions["day" + rate.day].x + 1) + "px";
        blockElement.style.top = (timetable.y + this.timeToY(rate.start_time)) + "px";
        blockElement.style.width = (this.positions["day" + rate.day].w - 1) + "px";
        blockElement.style.height =
            (this.timeToY(rate.end_time) - this.timeToY(rate.start_time) - 1) + "px";
        if ( this.state.displayedServices.includes(service.id) ) {
            blockElement.style.display = "block";
        }
    }

    timeToY(time) {
        let hours = parseInt(time.split("T")[1].split(":")[0]);
        let minutes = parseInt(time.split("T")[1].split(":")[1]);
        let hourRowPosition = this.positions["hour"+hours];
        return hourRowPosition.y + (minutes * (hourRowPosition.h / 60.0));
    }

    componentDidMount() {
        this.state.services.forEach((service) => {
            service.rates.forEach((rate) => {
                this.positionBlock(service, rate);
            });
        });
    }

}

export default ServiceTimetable;