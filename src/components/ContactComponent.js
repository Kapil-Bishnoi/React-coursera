import React from 'react';
import {Breadcrumb, BreadcrumbItem, Form, FormGroup, FormFeedback, Label, Input ,Col,Button } from 'reactstrap';
import {Link , NavLink} from 'react-router-dom';

class Contact extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            fullname: '',
            telnum: '',
            email: '',
            isAgree: false,
            contactType: "Tel.",
            message: '',
            touched:{
                fullname: false,
                telnum: false,
                email: false,
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleInputChange(event){
        const target = event.target ;
        const value = (target.type === "checkbox")? target.checked : target.value ;
        const nameOfProperty = target.name;
        this.setState(
            {
                [nameOfProperty] : value
            }
        );
    }

    handleFormSubmit(event){
        console.log("Feedback is submited"+JSON.stringify(this.state));
        alert("Feedback is submited"+JSON.stringify(this.state));
        event.preventDefault();
    }

    handleBlur = (field) => (e)=>{
        this.setState({
            touched: {...this.state.touched, [field]:true}
        });
    }

    Validate(fullname,telnum,email){
        const errors={
            fullname:'',
            telnum:'',
            email:'',
        }
        if(this.state.touched.fullname){
            if(fullname.length < 3){
                errors.fullname="your name should have atleast 3 charcters";
            }
            else if(fullname.length > 10){
                errors.fullname="your name should have atmost 12 charcters";
            }
        }
        const reg = /^\d+$/ ;
        if(this.state.touched.telnum && !reg.test(telnum)){
            errors.telnum="contact number should onliy have digits";
        }
        if(this.state.touched.email && email.split('').filter(c => c==='@').length !==1){
            errors.email="Email should contain a @ symbol";
        }
        return errors;
    }
    render(){

        const errors = this.Validate(this.state.fullname,this.state.telnum,this.state.email);

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
                        <Form onSubmit={this.handleFormSubmit}>
                            <FormGroup row>
                                <Label htmlFor="fullname" md={2} >Full Name</Label>
                                <Col md={10} >
                                    <Input type="text" id="fullname" name="fullname" required
                                        placeholder="Full Name" value={this.state.fullname}
                                        valid={errors.fullname === ''}
                                        invalid={errors.fullname !== ''}
                                        onChange={this.handleInputChange} onBlur={this.handleBlur('fullname')} />
                                    <FormFeedback>{errors.fullname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="telnum" md={2} >Tel. Number</Label>
                                <Col md={10} >
                                    <Input type="tel" id="telnum" name="telnum" required
                                        placeholder="Tel. Number" value={this.state.telnum}
                                        valid={errors.telnum === ''}
                                        invalid={errors.telnum !== ''}
                                        onChange={this.handleInputChange} onBlur={this.handleBlur('telnum')} />
                                    <FormFeedback>{errors.telnum}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2} >Email</Label>
                                <Col md={10} >
                                    <Input type="email" id="email" name="email" required
                                        placeholder="Email Id" value={this.state.email}
                                        valid={errors.email === ''}
                                        invalid={errors.email !== ''}
                                        onChange={this.handleInputChange} onBlur={this.handleBlur('email')} />
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size:6,offset:2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name="isAgree" checked={this.state.isAgree}
                                            onChange={this.handleInputChange} /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{size:3,offset:1}}>
                                    <Input type="select" name="contactType" value={this.state.contactType} onChange={this.handleInputChange}>
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={2} htmlFor="message">Your Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="message" name="message" rows="7"
                                        value={this.state.message} onChange={this.handleInputChange} /> 
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col md={{offset:2, size:10}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;