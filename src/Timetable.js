import React from 'react';

class Timetable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            itemKey: props.itemKey,
            activeGroups: props.activeGroups || [],
            selectedGroup: props.selectedGroup || null,
            selectedItem: props.selectedItem || null,
            showDays: props.showDays || [1, 2, 3, 4, 5, 6, 0],
            startHour: props.startHour || 0,
            endHour: props.endHour || 23,
            defaultColor: props.defaultColor || 'red',
            resizeToggle: false
        };
        this.dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
        // this.dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        this.labelMaker = props.labelMaker || this.defaultLabelMaker;
        this.onItemSelected = props.onItemSelected || this.defaultOnItemSelected;
        this.onItemDoubleClicked = props.onItemDoubleClicked || this.defaultOnItemDoubleClicked;
        this.onSelectionCleared = props.onSelectionCleared || this.defaultOnSelectionCleared;
        this.timetableId = "timetable-" + props.itemKey;
        this.elementPositions = {};
        this.selectedItem = null;
        this.loadedOnce = false;
        window.addEventListener("resize", this.handleResize);
    }

    handleResize = (e) => {
        this.setState({resizeToggle: !this.state.resizeToggle});
        this.positionBlocks();
    };

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
                    onDoubleClick={ev => this.handleDoubleClick(group, item)}
                >
                    {this.labelMaker.call(this, group, item)}
                </div>)
            });
        });
        if ( this.loadedOnce ) {
            this.positionBlocks();
        }
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
                        <th style={{boxShadow: "none"}} className="hour-col">&nbsp;</th>
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
            emptyCols.push(<td key={i}></td>);
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
        this.positionBlocks();
        this.updateSelection();
        this.loadedOnce = true;
    }

    getGroupsPerDay = () => {
        let result = new Array(7).fill(0);
        this.state.data.forEach((group) => {
            if (this.state.activeGroups.includes(group.id)) {
                let presentOnDays = new Array(7).fill(false);
                group[this.state.itemKey].forEach((item) => {
                    presentOnDays[item.day] = true;
                });
                presentOnDays.forEach((val, i) => {
                    if (val) {
                        result[i]++;
                    }
                });
            }
        });
        return result;
    };

    positionBlocks = () => {
        let groupsPerDay = this.getGroupsPerDay();
        let offsets = new Array(7).fill(0);
        this.state.data.forEach((group) => {
            if ( this.state.activeGroups.includes(group.id) ) {
                let hitDays = new Array(7).fill(false);
                group[this.state.itemKey].forEach((item) => {
                    this.positionItem(group, item, offsets[item.day], groupsPerDay[item.day]);
                    hitDays[item.day] = true;
                });
                hitDays.forEach((val, i) => {
                    if (val) {
                        offsets[i]++;
                    }
                });
            }
        });
    };

    updateSelection = () => {
        if (this.state.selectedGroup != null && this.state.selectedItem != null) {
            this.handleSelect(this.state.selectedGroup, this.state.selectedItem);
        } else {
            this.clearSelection();
        }
    };

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

    positionItem(group, item, leftOffset = 0, widthDivider = 1) {
        if (this.state.showDays.includes(item.day)) {
            let blockElement = this.getBlockElement(group, item);
            let timetable = {
                x: this.elementPositions.timetable.x,
                y: this.elementPositions.timetable.y
            };
            let width = (this.elementPositions["day" + item.day].w - 1) / widthDivider;
            blockElement.style.left =
                ((timetable.x + this.elementPositions["day" + item.day].x + 1)
                + (widthDivider > 1 ? leftOffset * width : 0)) + "px";
            blockElement.style.top =
                (timetable.y + this.timeToY(item.start_time) + 1) + "px";
            blockElement.style.width = width + "px";
            blockElement.style.height =
                (this.timeToY(item.end_time) - this.timeToY(item.start_time) - 1) + "px";
            blockElement.style.color = "black";
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
        this.onItemSelected.call(this, group, item);
    };

    handleDoubleClick = (group, item) => {
        this.onItemDoubleClicked.call(group, item);
    };

    clearSelection() {
        this.resetSelectedItemBlock();
        this.selectedItem = null;
        this.onSelectionCleared.call(this);
    }

    resetSelectedItemBlock() {
        if (this.selectedItem != null) {
            this.getSelectedBlockElement().style.color = "black";
            this.getSelectedBlockElement().style.border = "1px solid black";
        }
    }

    defaultOnItemSelected = (group, item) => {
        console.log(group.id + "/" + item.id);
    };

    defaultOnItemDoubleClicked = (group, item) => {
        console.log("Double click");
    };

    defaultOnSelectionCleared = () => {
        console.log("Selection cleared");
    };

    defaultLabelMaker = () => {
        return "";
    };

}

export default Timetable;