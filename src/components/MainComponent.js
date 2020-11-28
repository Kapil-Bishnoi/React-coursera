import React from 'react';
import {CardImgOverlay,CardText} from 'reactstrap';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailsComponent'
import {DISHES} from '../shared/dishes';
import {PROMOTIONS} from '../shared/promotions';
import {LEADERS} from '../shared/leaders';
import {COMMENTS} from '../shared/comments';

import { Switch,Route,Redirect } from 'react-router-dom';

class Main extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      leaders: LEADERS,
      promotions: PROMOTIONS,
      selectedDishId: null,
      enteredDishId: null,
    };
  }
  onDishEnter(dishId){
    this.setState({
        enteredDishId:dishId
    });
  }
  onDishClick(dishId){
    this.setState({
        selectedDishId:dishId
    });
  }
  displayDish(dish){
    if(this.state.enteredDishId!==null && dish.id===this.state.enteredDishId){
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

  render() {

    const HomePage = ()=>{
      return(
        <Home dish={this.state.dishes.filter((dish)=>dish.featured===true)[0]}
              promotion={this.state.promotions.filter((pro)=>pro.featured===true)[0]}
              leader={this.state.leaders.filter((lead)=>lead.featured===true)[0]} />
      );
    }
    const MenuPage = ()=>{
      return(
        <Menu dishes={this.state.dishes}
              onClick={(dishId)=> this.onDishClick(dishId)} 
              onMouseEnter={(dishId)=>this.onDishEnter(dishId)}
              displayDish={(dish)=>this.displayDish(dish)} />
      );
    }
    return (
      <div className="Main">
        <Header />
        <Switch>
          <Route component={HomePage} path='/home' />
          <Route component={MenuPage} exact path='/menu' />
          <Route component={Contact} exact path='/contactus' />
          <Redirect to='/home' />
        </Switch>
        {/* <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDishId)[0]} /> */}
        <Footer />
      </div>
    );
  }
}

export default Main ;

