import React from 'react';
import {Card,CardImg,CardImgOverlay,CardText,CardTitle,Breadcrumb,BreadcrumbItem, CardFooter, Button, CardHeader, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';


const DisplayDish = ({dish}) => {
    return(
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
          <CardImgOverlay>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardImgOverlay>
        </Card>
    );
}  
const DisplayReviews = ({comments,toggleCommentModal}) => {
    const comment = comments.map((c)=>{
        return(   
            <div>       
                <p className="m-1" >{c.comment}</p>
                <p style={{color:"gray"}}>-- {c.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(c.date)))}</p>
            </div>
        );
    });
    return(
        <Card>
           <CardHeader ><h4>Reviews</h4></CardHeader>
           <CardText>{comment}</CardText>
           <CardFooter>
               <Button onClick={() => toggleCommentModal()}>
                  <span className="fa fa-comment fa-lg" /> Submit Comment
               </Button>
           </CardFooter>
        </Card>
    );
}

const DishDetail = (props) => {
    if(props.dish===null){
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
                        <DisplayReviews comments={props.comments} toggleCommentModal={props.toggleCommentModal} />
                    </div>
                </div>
            </div>
        );
    }
}

export default DishDetail ;