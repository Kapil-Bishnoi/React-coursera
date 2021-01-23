import React from 'react';
import {Card,CardBody,CardImg,CardText,CardTitle,CardSubtitle} from 'reactstrap';
import {Loading} from './LoadingComponent';
import {ServerBaseUrl} from '../shared/ServerBaseUrl';
import { FadeTransform } from 'react-animation-components';

function DisplayHomeCard({item,isLoading,errMsg}){
    if(isLoading){
        return(
            <Loading />
        );
    }
    else if(errMsg){
        return(
            <h4>{errMsg}</h4>
        );
    }
    else{
        return(
            <FadeTransform in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg src={ServerBaseUrl + item.image} alt={item.name} />
                    <CardBody>
                        <CardTitle>
                            {item.name}
                        </CardTitle>
                        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    }
}

function Home(props){
    return(
        <div className="container">
            <div className="row">
                <div className="col-12 col-sm m-1">
                    <DisplayHomeCard item={props.dish} isLoading={props.isdishesLoading} errMsg={props.dishesErrMsg}  />
                </div>
                <div className="col-12 col-sm m-1">
                    <DisplayHomeCard item={props.promotion} isLoading={props.ispromosLoading} errMsg={props.promosErrMsg}  />
                </div>
                <div className="col-12 col-sm m-1">
                    <DisplayHomeCard item={props.leader} />
                </div>
            </div>
        </div>
    );
}

export default Home ;