import React from 'react';
import {Card,CardBody,CardImg,CardText,CardTitle,CardSubtitle} from 'reactstrap';

function DisplayHomeCard({item}){
    return(
        <Card>
            <CardImg src={item.image} alt={item.name} />
            <CardBody>
                <CardTitle>{item.name}</CardTitle>
                {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );
}

function Home(props){
    return(
        <div className="container">
            <div className="row">
                <div className="col-12 col-sm m-1">
                    <DisplayHomeCard item={props.dish} />
                </div>
                <div className="col-12 col-sm m-1">
                    <DisplayHomeCard item={props.promotion} />
                </div>
                <div className="col-12 col-sm m-1">
                    <DisplayHomeCard item={props.leader} />
                </div>
            </div>
        </div>
    );
}

export default Home ;