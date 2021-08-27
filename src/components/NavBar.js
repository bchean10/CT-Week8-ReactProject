import React, { Component } from 'react'
import {Nav, Navbar, Container, NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export default class NavBar extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Shoppy</Navbar.Brand>
                    <Nav className="me-auto">
                        {this.props.token ?
                        <>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
                        <Nav.Link as={Link} to="/logout">Logout</Nav.Link>

                        <NavDropdown title="Owner" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/createproduct">Create Product</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/productaction">Product Actions</NavDropdown.Item>
                        </NavDropdown>
                        
                        </>
                        :
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        }
                    </Nav>
                    <span className="float-end">
                    <Link to="/cart" style={{color:'white'}}><ShoppingCartIcon/>Total: ${this.props.getCartTotalPrice().toFixed(2)}, products: {this.props.getCartProductTotal()}</Link>
                    </span> 
                </Container>
            </Navbar>
        )
    }
}
