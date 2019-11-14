import React from 'react';
import ReactDOM from 'react-dom';
import Api from './Api.js';

class ServiceTimetable extends React.Component {
    constructor(props) {
        super(props);
        this.rows = [];
        this.positions = {};
    }

    render() {
        for (var i = 0; i < 24; i++) {
            this.rows.push(this.createRow(i));
        }
        return (
            <div id="timetable" ref={ el => {
                this.storePos("timetable", el)
            }}
                 className="service-timetable">
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
                    {this.rows}
                    </tbody>
                </table>
                <div id="rate" className="rate-block"></div>
            </div>
        );
    }

    createCol(day, dayName) {
        return (
            <th ref={el => {
                this.storePos("day" + day, el)
            }} className="day-col">{dayName}</th>
        )
    }

    createRow(hour) {
        return(
            <tr className="hour-row">
                <td style={{fontSize: "smaller", textAlign: "right", backgroundColor: "black", color: "white", border: "none"}}
                ref={el => this.storePos("hour" + hour, el)}
                >{hour}:00</td>
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
    positionBlock(blockId, day, hour) {
        let blockElement = document.getElementById(blockId);
        let timetable = {
            x: this.positions.timetable.x,
            y: this.positions.timetable.y
        }
        blockElement.style.left = (timetable.x + this.positions["day" + day].x) + "px";
        blockElement.style.top = (timetable.y + this.positions["hour" + hour].y) + "px";
        blockElement.style.width = this.positions["day" + day].w + "px";

    }

    componentDidMount() {
        console.log(this.positions);
        this.positionBlock('rate', 3, 18);
    }

}

export default ServiceTimetable;