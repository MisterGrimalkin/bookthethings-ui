import React from 'react';
import Api from './Api.js';
import Util from './Util.js';
import CustomerDashboard from './CustomerDashboard.js';
import ProviderDashboard from './ProviderDashboard.js';
import EditUserDetails from './EditUserDetails.js';
import ServiceConfiguration from './ServiceConfiguration.js';
import {bake_cookie, read_cookie} from 'sfcookies';

class MainPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTab: Util.getQueryParam('tab') || 'userDetails',
            isProvider: false,
            isCustomer: false
        };
        this.tabPanels = {
            providerDashboard: <ProviderDashboard/>,
            serviceConfiguration: <ServiceConfiguration/>,
            customerDashboard: <CustomerDashboard/>,
            userDetails: <EditUserDetails/>
        };
    }

    render() {
        let tabSelectors = [];
        if (this.state.isProvider) {
            tabSelectors.push(this.makeTabSelector('providerDashboard', 'Provider Dashboard'));
            tabSelectors.push(this.makeTabSelector('serviceConfiguration', 'Service Setup'));
        }
        if (this.state.isCustomer) {
            tabSelectors.push(this.makeTabSelector('customerDashboard', 'Customer Dashboard'));
        }
        tabSelectors.push(this.makeTabSelector('userDetails', 'User Details'));
        return (
            <div className="main-container">
                <div className="tab-bar">
                    {tabSelectors}
                </div>
                <div className="content-container">
                    {this.tabPanels[this.state.currentTab]}
                </div>
            </div>
        );
    }

    makeTabSelector(tab, label) {
        let className = 'col-md-2 tab ' + (tab === this.state.currentTab ? 'active-tab' : '');
        return <div className={className} key={label} onClick={e => this.showTab(e, tab)}>{label}</div>
    }

    showTab(event, tab) {
        if ( event.ctrlKey ) {
            window.open('/?tab='+tab);
        } else {
            bake_cookie("tab", tab);
            this.setState({currentTab: tab});
        }
    }

    componentDidMount() {
        Api.onUserLoaded((user) => {
            let currentTab = Util.getQueryParam('tab');
            if ( currentTab === '' ) {
                currentTab = 'userDetails';
                if (user.is_customer) currentTab = 'customerDashboard';
                if (user.is_provider) currentTab = 'providerDashboard';
            }
            if ( read_cookie("tab").length > 0 ) {
                currentTab = read_cookie("tab");
            }
            this.setState({isProvider: user.is_provider, isCustomer: user.is_customer, currentTab: currentTab});
        });

    }

}

export default MainPanel;
