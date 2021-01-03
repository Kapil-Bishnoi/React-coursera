import React from 'react';
import { NavLink } from 'react-router-dom';
import {Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem,Jumbotron,Modal,ModalBody,ModalHeader,Button, Form,Row,Col, FormGroup, Label,Input} from 'reactstrap';
import {LocalForm,Control,Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class Header extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isNavOpen: false,
            isLoginModalOpen: false
        };
        this.openNavbar = this.openNavbar.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    
    openNavbar(){
        this.setState({
            isNavOpen : !(this.state.isNavOpen)
        });
    }
    toggleLoginModal(){
        this.setState({
            isLoginModalOpen: !(this.state.isLoginModalOpen)
        });
    }
    
    handleLogin(event){
        this.toggleLoginModal(); //closes the login popup
        alert(`Username: ${this.username.value} Password: ${this.password.value} Remember: ${this.remember.checked}`);
        event.preventDefault();
    }

    render(){
        return(
        <React.Fragment>
            <Navbar expand="md" className="Navbar" dark >
                <div className="container">
                    <NavbarToggler onClick={this.openNavbar} />
                    <NavbarBrand className="mr-auto" href="http://reactjs.org" target="_blank">
                        <img src="assets/images/logo.png" alt="Ristorante" width="50" height="40"></img>
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to="/home"><span className="fa fa-home fa-lg"></span> Home</NavLink>
                            </NavItem>
                        </Nav>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to="/aboutus"><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                            </NavItem>
                        </Nav>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to="/menu"><span className="fa fa-list fa-lg"></span> Menu</NavLink>
                            </NavItem>
                        </Nav>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to="/contactus"><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                            </NavItem>
                        </Nav>
                        <Nav navbar className="ml-auto">
                            <NavItem>
                                <Button outline onClick={this.toggleLoginModal}>
                                    <span className="fa fa-sign-in fa-lg"/> Login
                                </Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>Ristorante </h1>
                            <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                        </div>
                    </div>
                </div>
            </Jumbotron>
            <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal} >
                <ModalHeader toggle={this.toggleLoginModal} >Login</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleLogin}>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" id="username" name="username"
                                innerRef={(inputbro)=>{this.username=inputbro}}  />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password"
                                innerRef={(inputbro)=>{this.password=inputbro}} />
                        </FormGroup>
                        <FormGroup check>
                            <Label check >
                                <Input type="checkbox" id="remember" name="remember"
                                    innerRef={(inputbro)=>{this.remember=inputbro}} />
                                Remember me
                            </Label>
                            <hr></hr>
                        </FormGroup>
                        <FormGroup >
                            <Button type="submit" value="submit" color="primary">
                                Login
                            </Button>
                            <Button className="ml-2" onClick={this.openLoginModal} >
                                Cancel
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </React.Fragment>
        );
    }
}

export default Header ;