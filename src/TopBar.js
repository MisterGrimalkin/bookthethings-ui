import React from 'react';
import Api from './Api.js';

class TopBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {user: {}, expanded: false};
    }

    render() {
        return (
            <div className="user-details">
                <p className="float-left">Welcome
                    <strong> {this.state.user.name}</strong>
                    { this.state.user.company ? ' (' + this.state.user.company + ')' : ''}
                </p>
                <button
                    className="btn btn-sm btn-danger float-right"
                    onClick={e => Api.logout()}>Log Out</button>
            </div>
        );
    }

    componentDidMount() {
        Api.onUserLoaded((user) => {
            this.setState({user: user})
        });
    }
}

export default TopBar;
