import React from 'react'

class RateForm extends React.Component {

    constructor(props) {
        super(props);
        this.element = null;
    }

    render() {
        return(
            <div
                className="btt-form"
                ref={(element) => this.element = element}
            >
                <h1>Raunchy Rate</h1>
            </div>
        );
    }

    open(service) {
        this.element.style.display = "block";
    }

    close() {
        this.element.style.display = "none";
    }

}

export default RateForm;
