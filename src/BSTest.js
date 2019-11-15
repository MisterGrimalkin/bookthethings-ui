import {
    Container, Row, Col, Navbar, NavbarBrand, Nav, NavItem, NavLink, Card, CardBody, CardTitle, CardSubtitle, CardText, Button
} from 'bootstrap';

import React from 'react';

class BSTest extends React.Component {

    render() {
        return(
            <Navbar color="faded" light expand="md">

                <NavbarBrand href="/">
                    React Bootstrap Example
                </NavbarBrand>
                <Nav className="ml-auto" navbar>

                    <NavItem className="d-flex align-items-center">
                        <NavLink className="font-weight-bold" href="/">Home</NavLink>
                    </NavItem>
                    <NavItem className="d-flex align-items-center">
                        <NavLink className="font-weight-bold" href="https://www.techiediaries.com/react-bootstrap">
                            Tutorial
                        </NavLink>
                    </NavItem>


                </Nav>
            </Navbar>

        );
    }
}

export default BSTest;