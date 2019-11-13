import React from 'react';
import Api from './Api.js';

class ServiceTimetable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="service-timetable">
                <table>
                    <thead>
                    <tr>
                        <th className="time-col"></th>
                        <th className="day-col">Monday</th>
                        <th className="day-col">Tuesday</th>
                        <th className="day-col">Wednesday</th>
                        <th className="day-col">Thursday</th>
                        <th className="day-col">Friday</th>
                        <th className="day-col">Saturday</th>
                        <th className="day-col">Sunday</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td id="hour0">00:00</td>
                    </tr>
                    <tr>
                        <td>01:00</td>
                    </tr>
                    <tr>
                        <td>02:00</td>
                    </tr>
                    <tr>
                        <td>03:00</td>
                    </tr>
                    <tr>
                        <td>04:00</td>
                    </tr>
                    <tr>
                        <td>05:00</td>
                    </tr>
                    <tr>
                        <td>06:00</td>
                    </tr>
                    <tr>
                        <td>07:00</td>
                    </tr>
                    <tr>
                        <td>08:00</td>
                    </tr>
                    <tr>
                        <td>09:00</td>
                    </tr>
                    <tr>
                        <td>10:00</td>
                    </tr>
                    <tr>
                        <td>11:00</td>
                    </tr>
                    <tr>
                        <td>12:00</td>
                    </tr>
                    <tr>
                        <td>13:00</td>
                    </tr>
                    <tr>
                        <td>14:00</td>
                    </tr>
                    <tr>
                        <td>15:00</td>
                    </tr>
                    <tr>
                        <td>16:00</td>
                    </tr>
                    <tr>
                        <td>17:00</td>
                    </tr>
                    <tr>
                        <td>18:00</td>
                    </tr>
                    <tr>
                        <td>19:00</td>
                    </tr>
                    <tr>
                        <td>20:00</td>
                    </tr>
                    <tr>
                        <td>21:00</td>
                    </tr>
                    <tr>
                        <td>22:00</td>
                    </tr>
                    <tr>
                        <td>23:00</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
    componentDidMount() {
        let block = React.createElement('div', null, "hello");
        console.log(block);
    }

}

export default ServiceTimetable;