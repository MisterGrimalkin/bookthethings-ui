import React from 'react';

class Timetable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            itemKey: props.itemKey,
            activeGroups: props.activeGroups || [],
            labelMaker: props.labelMaker || this.defaultLabelMaker,
            onItemSelected: props.onItemSelected || this.defaultOnItemSelected,
            onSelectionCleared: props.onSelectionCleared || this.defaultOnSelectionCleared,
            showDays: props.showDays || [1, 2, 3, 4, 5, 6, 0],
            startHour: props.startHour || 0,
            endHour: props.endHour || 23,
            defaultColor: props.defaultColor || 'red'
        };
        this.timetableId = "timetable-" + Math.round(Math.random() * 1000000);
        this.elementPositions = {};
        this.dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        this.selectedItem = null;
    }

    render() {
        // Rows (hours)
        let rows = [];
        for (var i = this.state.startHour; i <= this.state.endHour; i++) {
            rows.push(this.createRow(i));
        }
        // Column Headers (days)
        let columnHeaders = [];
        this.state.showDays.forEach((day) => {
            columnHeaders.push(this.createColumnHeader(day));
        });
        // Item blocks
        let itemBlocks = [];
        this.state.data.forEach((group) => {
            group[this.state.itemKey].forEach((item) => {
                let display =
                    this.state.activeGroups.includes(group.id)
                    && this.state.showDays.includes(item.day);
                let itemId = "g" + group.id + "i" + item.id;
                itemBlocks.push(<div
                    id={itemId}
                    key={itemId}
                    style={{
                        backgroundColor: group.color || this.state.defaultColor,
                        display: (display ? 'block' : 'none')
                    }}
                    className="timetable-item"
                    onClick={ev => this.handleSelect(group, item) }
                >
                    {this.state.labelMaker.call(this, group, item)}
                </div>)
            });
        });
        // Build timetable
        return (
            <div id={this.state.timetableId}
                 ref={el => {
                     this.storeElement("timetable", el)
                 }}
                 className="timetable">
                <table onClick={e => this.clearSelection()} cellSpacing={0}>
                    <thead>
                    <tr>
                        <th className="hour-col">&nbsp;</th>
                        {columnHeaders}
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
                {itemBlocks}
            </div>
        );
    }

    createColumnHeader(day) {
        return (
            <th key={day}
                ref={el => this.storeElement("day" + day, el)}
                className="day-col"
                style={{width: ((1 / this.state.showDays.length) * 100) + "%"}}
            >{this.dayNames[day]}
            </th>
        )
    }

    createRow(hour) {
        let emptyCols = [];
        this.state.showDays.forEach((day, i) => {
            emptyCols.push(<td key={i}>&nbsp;</td>);
        });
        return (
            <tr key={hour} className="hour-row">
                <td style={{border: "none"}}
                    className="hour-label"
                    ref={el => this.storeElement("hour" + hour, el)}
                >
                    {hour}:00
                </td>
                {emptyCols}
            </tr>
        )
    }

    storeElement(key, element) {
        if (element != null) {
            this.elementPositions[key] = {
                x: element.offsetLeft,
                y: element.offsetTop,
                w: element.offsetWidth,
                h: element.offsetHeight
            };
        }
    }

    componentDidMount() {
        this.state.data.forEach((group) => {
            group[this.state.itemKey].forEach((item) => {
                this.positionItem(group, item);
            });
        });
    }

    getSelectedBlockElement() {
        if (this.selectedItem == null) {
            return null;
        } else {
            return this.getBlockElement(this.selectedItem.group, this.selectedItem.item);
        }
    }

    getBlockElement(group, item) {
        return document.getElementById("g" + group.id + "i" + item.id);
    }

    positionItem(group, item) {
        if (this.state.showDays.includes(item.day)) {
            let blockElement = this.getBlockElement(group, item);
            let timetable = {
                x: this.elementPositions.timetable.x,
                y: this.elementPositions.timetable.y
            };
            blockElement.style.left =
                (timetable.x + this.elementPositions["day" + item.day].x + 1) + "px";
            blockElement.style.top =
                (timetable.y + this.timeToY(item.start_time)) + "px";
            blockElement.style.width =
                (this.elementPositions["day" + item.day].w - 1) + "px";
            blockElement.style.height =
                (this.timeToY(item.end_time) - this.timeToY(item.start_time) - 1) + "px";
        }
    }

    timeToY(time) {
        let hour = parseInt(time.split("T")[1].split(":")[0]);
        let minute = parseInt(time.split("T")[1].split(":")[1]);
        if (hour < this.state.startHour) {
            hour = this.state.startHour;
            minute = 0;
        }
        if (hour > this.state.endHour) {
            hour = this.state.endHour;
            minute = 59;
        }
        let hourRowPosition = this.elementPositions["hour" + hour];
        return hourRowPosition.y + (minute * (hourRowPosition.h / 60.0));
    }

    handleSelect = (group, item) => {
        this.resetSelectedItemBlock();
        let blockElement = this.getBlockElement(group, item);
        blockElement.style.border = "1px solid yellow";
        blockElement.style.color = "yellow";
        this.selectedItem = {group: group, item: item};
        this.state.onItemSelected.call(this, group, item);
    };

    clearSelection() {
        this.resetSelectedItemBlock();
        this.selectedItem = null;
        this.state.onSelectionCleared.call(this);
    }

    resetSelectedItemBlock() {
        if (this.selectedItem != null) {
            this.getSelectedBlockElement().style.border = "1px solid black";
            this.getSelectedBlockElement().style.color = "black";
        }
    }

    defaultOnItemSelected = (group, item) => {
        console.log(group.id + "/" + item.id);
    };

    defaultOnSelectionCleared = () => {
        console.log("Selection cleared");
    };

    defaultLabelMaker = () => {
        return "";
    };

}

export default Timetable;