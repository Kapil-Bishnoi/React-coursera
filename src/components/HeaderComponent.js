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

    handleCommentFormSubmit(values){
        this.props.toggleCommentModal(); //close the modal
        console.log("Comment is submitted "+JSON.stringify(values));
        alert("Comment is submited "+JSON.stringify(values));
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
            <Modal isOpen={this.props.isCommentModalOpen} toggle={() => this.props.toggleCommentModal()} >
                <ModalHeader toggle={() => this.props.toggleCommentModal()} >Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleCommentFormSubmit(values)}>
                        <Row className="form-group">
                            <Col md={2}>
                                <Label htmlFor="rating">Rating</Label>
                            </Col>
                            <Col>
                            <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="yourname" md={2} >Your Name</Label>
                            <Col >
                                <Control.text model=".yourname" id="yourname" name="yourname"placeholder="Your Name" 
                                    className="form-control"
                                    validators={{
                                        required,minLength: minLength(3),maxLength: maxLength(30)
                                    }}  
                                />
                                    <Errors 
                                        className="text-danger" 
                                        model=".yourname" 
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be atleast 3 characters',
                                            maxLength: 'Must not be greater than 30 characters'
                                        }}
                                    />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={2}>Comment</Label>
                            <Col>
                            <Control.textarea model=".comment" id="comment" name="comment"
                                placeholder="Let's Comment on Food" className="form-control" rows="4"
                            />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{offset:2, size:10}}>
                                <Button type="submit" color="primary">
                                    Send
                                </Button>
                                <Button className="ml-2" onClick={() => this.props.toggleCommentModal()} >
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </React.Fragment>
        );
    }
}

export default Header ;