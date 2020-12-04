import React from 'react';
import {Breadcrumb, BreadcrumbItem, Label, Row, Col, Button } from 'reactstrap';
import {Link , NavLink} from 'react-router-dom';
import {LocalForm,Control,Errors} from 'react-redux-form';

class Contact extends React.Component{

    constructor(props){
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(values){
        console.log("Feedback is submited"+JSON.stringify(values));
        alert("Feedback is submited"+JSON.stringify(values));
    }

    render(){

        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us Your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <LocalForm onSubmit={(values) => this.handleFormSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="fullname" md={2} >Full Name</Label>
                                <Col md={10} >
                                    <Control.text model=".fullname" id="fullname" name="fullname"
                                        placeholder="Full Name" className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="telnum" md={2} >Tel. Number</Label>
                                <Col md={10} >
                                    <Control.text modal=".telnum" id="telnum" name="telnum"
                                        placeholder="contact number" className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2} >Email</Label>
                                <Col md={10} >
                                    <Control.text modal=".email" id="email" name="email"
                                        placeholder="Email Id" className="form-control" />  
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:6,offset:2}}>
                                    <div className="form-check" >
                                        <Label check>
                                            <Control.checkbox modal=".isAgree" name="isAgree" className="form-check-input" /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{size:3,offset:1}}>
                                    <Control.select model=".contactType" name="contactType" className="form-control">
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={2} htmlFor="message">Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="7" className="form-control" /> 
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{offset:2, size:10}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;