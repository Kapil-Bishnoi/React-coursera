import React from 'react';
import { NavLink } from 'react-router-dom';
import {Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem,Jumbotron,Modal,ModalBody,ModalHeader,Button,Row,Col,Label} from 'reactstrap';
import {Form,Control,Errors} from 'react-redux-form';

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
    
    handleLogin(values){
        
        alert(`Successfully Logged in\n`);
        console.log(`Successfully Logged in\n`);
        this.toggleLoginModal(); //closes the login popup

    }

    render(){
        return(
        <React.Fragment>
            <Navbar expand="md" className="Navbar" dark >
                <div className="container">
                    <NavbarToggler onClick={this.openNavbar} />
                    <NavbarBrand className="mr-auto" href="/home">
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
                    <Form model="loginForm"  onSubmit={(values) => this.handleLogin(values)} >
                        <Row className="form-group">
                            <Label htmlFor="username" md={2} >User Name</Label>
                            <Col md={10} >
                                <Control.text model=".username" id="username" name="username"
                                    placeholder="User Name" className="form-control"
                                    validators={{
                                        required,minLength: minLength(3),maxLength: maxLength(30)
                                    }} 
                                />
                                <Errors 
                                    className="text-danger" 
                                    model=".username" 
                                    show={{touched:true,focus:false}}
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be atleast 3 characters',
                                        maxLength: 'Must not be greater than 30 characters'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="password" md={2} >Password</Label>
                            <Col md={10} >
                                <Control.text model=".password" type="password" id="password" name="password"
                                    placeholder="Password" className="form-control"
                                    validators={{
                                        required
                                    }} 
                                />
                                <Errors 
                                    className="text-danger" 
                                    model=".password" 
                                    show={{touched:true,focus:false}}
                                    messages={{
                                        required: 'Required',
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size:6,offset:2}}>
                                <div className="form-check" >
                                    <Label check>
                                        <Control.checkbox model=".isAgree" name="isAgree" className="form-check-input" /> {' '}
                                        <strong>terms and conditions</strong>
                                    </Label>
                                </div>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{offset:2, size:2}}>
                                <Button type="submit" color="primary">
                                    Login
                                </Button>
                            </Col>
                            <Col md={{offset:1}}>
                                <Button onClick={() => this.toggleLoginModal()} color="gray" className="btn-outline-dark">
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
            </Modal>
        </React.Fragment>
        );
    }
}

export default Header ;