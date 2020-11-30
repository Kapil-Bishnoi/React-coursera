import React from 'react';
import {CardImgOverlay,CardText} from 'reactstrap';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
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
    const DishInfoPage = ({match,location,history})=>{
      return(
        <DishDetail dish={this.state.dishes.filter((dish)=> dish.id=== parseInt(match.params.dish_id,10))[0]}
        comments={this.state.comments.filter((c)=> c.dishId===parseInt(match.params.dish_id,10))} />
      );
    }
    const AboutPage = ()=>{
      return(
        <About leaders={this.state.leaders} />
      );
    }
    return (
      <div className="Main">
        <Header />
        <Switch>
          <Route component={HomePage} path='/home' />
          <Route component={MenuPage} exact path='/menu' />
          <Route component={DishInfoPage} path='/menu/:dish_id' />
          <Route component={Contact} exact path='/contactus' />
          <Route component={AboutPage} exact path='/aboutus' />
          <Redirect to='/home' />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main ;

