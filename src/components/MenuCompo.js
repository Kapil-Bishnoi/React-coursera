import React, {Component} from 'react';
import {Card,CardImg,CardImgOverlay,CardBody,CardText,CardTitle} from 'reactstrap';
class Menu extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedDish: null,
        }
    }

    onDishSelection(dish){
        this.setState({
            selectedDish:dish
        });
    }
    displayDish(dish){
        if(this.state.selectedDish!==null && dish===this.state.selectedDish){
            return(
                <CardImgOverlay>
                    <CardText className="mt-4">{dish.description}</CardText>
                </CardImgOverlay>
            );
        }
        else{
            return (<div></div>);
        }
    }

    render(){
        
        const menu=this.props.dishes.map((dish)=>{
            return(
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={()=>this.onDishSelection(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle > {dish.name} </CardTitle>
                            {this.displayDish(dish)}
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        return(
            <div className="container">
                <div className="row">
                   {menu}
                </div>
            </div>
        );
    }
}
export default Menu ;