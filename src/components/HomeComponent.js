import React from 'react';
import {Card,CardBody,CardImg,CardText,CardTitle,CardSubtitle} from 'reactstrap';
import { fetchDishes } from '../redux/ActionCreators';
import {Loading} from './LoadingComponent';

function DisplayHomeCard({item,isdishesLoading,dishesErrMsg}){
    if(isdishesLoading){
        return(
            <Loading />
        );
    }
    else if(dishesErrMsg){
        return(
            <h4>{dishesErrMsg}</h4>
        );
    }
    else{
        return(
            <Card>
                <CardImg src={item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>
                        {/* {item.name} */}
                        Jenn
                    </CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        );
    }
}

function Home(props){
    return(
        <div className="container">
            <div className="row">
                <div className="col-12 col-sm m-1">
                    <DisplayHomeCard item={props.dish} isdishesLoading={props.isdishesLoading} dishesErrMsg={props.dishesErrMsg}  />
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