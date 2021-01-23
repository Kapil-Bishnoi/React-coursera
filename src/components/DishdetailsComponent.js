import React from 'react';
import {Row, Col, Label, Card,CardImg,CardImgOverlay,CardText,CardTitle,Breadcrumb,BreadcrumbItem, CardFooter, Button, CardHeader, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import {LocalForm,Control,Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {ServerBaseUrl} from '../shared/ServerBaseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


const DisplayDish = ({dish}) => {
    return(
        <FadeTransform in
        transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
            <Card>
                <CardImg width="100%" src={ServerBaseUrl + dish.image} alt={dish.name}></CardImg>
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardImgOverlay>
            </Card>
        </FadeTransform>
    );
}  
const DisplayReviews = ({comments,postComment,dishId}) => {
    const comment = comments.map((c)=>{
        return(   
            <Fade in>
                <div>       
                    <p className="m-1" >{c.comment}</p>
                    <p style={{color:"gray"}}>-- {c.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(c.date)))}</p>
                </div>
            </Fade>
        );
    });
    return(
        <Card>
            <CardHeader ><h4>Reviews</h4></CardHeader>
                <CardText>
                    <Stagger in>
                        {comment}
                    </Stagger>
                </CardText>
            <CardFooter>
                <CommentForm postComment={postComment} dishId={dishId} />
            </CardFooter>
        </Card>
    );
}

class CommentForm extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            isCommentModalOpen: false,
        };
        this.toggleCommentModal = this.toggleCommentModal.bind(this);
        this.handleCommentFormSubmit = this.handleCommentFormSubmit.bind(this);
    }

    toggleCommentModal(){
        this.setState({
            isCommentModalOpen: !(this.state.isCommentModalOpen),
        });
    }

    handleCommentFormSubmit(values){
        this.toggleCommentModal();
        this.props.postComment(this.props.dishId,values.yourname,values.rating,values.comment);
    }

    render(){
        return(
            <div>
                <Button outline onClick={this.toggleCommentModal}><span className="fa fa-comment"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isCommentModalOpen} toggle={this.toggleCommentModal}>
                <ModalHeader toggle={this.toggleCommentModal}>Submit Comment</ModalHeader>
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
                                    Submit
                                </Button>
                                <Button className="ml-2" onClick={this.toggleCommentModal} >
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
                </Modal>
            </div>
        );
    }
}

const DishDetail = (props) => {
    if(props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if(props.dishesErrMsg || props.commentsErrMsg){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.dishesErrMsg + props.commentsErrMsg}</h4>
                </div>
            </div>
        );
    }
    else if(props.dish===null){
        return(
            <div></div>
        );
    }
    else{
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row" key={props.dish.id} >
                    <div  className="col-12 col-md-5 m-1">
                        <DisplayDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <DisplayReviews comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id} 
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default DishDetail ;