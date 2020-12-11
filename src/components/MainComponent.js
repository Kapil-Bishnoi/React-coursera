import React from 'react';
import {CardImgOverlay,CardText} from 'reactstrap';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailsComponent';
import { Switch,Route,Redirect,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return(
    {
      dishes: state.dishes,
      comments: state.comments,
      leaders: state.leaders,
      promotions: state.promotions,
      // isCommentModalOpen: state.isCommentModalOpen
    }
  );
}

class Main extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      enteredDishId: null,
      isCommentModalOpen: false
    };
    
  }

  toggleCommentModal(){
    this.setState({
        isCommentModalOpen: !(this.state.isCommentModalOpen)
    });
  }

  onDishEnter(dishId){
    this.setState({
        enteredDishId:dishId
    });
  }
  displayLittleDishInfo(dish){
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
        <Home dish={this.props.dishes.filter((dish)=>dish.featured===true)[0]}
              promotion={this.props.promotions.filter((pro)=>pro.featured===true)[0]}
              leader={this.props.leaders.filter((lead)=>lead.featured===true)[0]} />
      );
    }
    const MenuPage = ()=>{
      return(
        <Menu dishes={this.props.dishes}
              onDishEnter={(dishId)=>this.onDishEnter(dishId)}
              displayLittleDishInfo={(dish)=>this.displayLittleDishInfo(dish)} />
      );
    }
    const DishInfoPage = ({match,location,history})=>{
      return(
        <DishDetail dish={this.props.dishes.filter((dish)=> dish.id=== parseInt(match.params.dish_id,10))[0]}
        comments={this.props.comments.filter((c)=> c.dishId===parseInt(match.params.dish_id,10))}
        toggleCommentModal={() => this.toggleCommentModal()}
         />
      );
    }
    const ContactPage = () => {
      return(
        <Contact />
      );
    }
    const AboutPage = ()=>{
      return(
        <About leaders={this.props.leaders} />
      );
    }
    return (
      <div className="Main">
        <Header isCommentModalOpen={this.state.isCommentModalOpen} toggleCommentModal={() => this.toggleCommentModal()}  />
        <Switch>
          <Route component={HomePage} path='/home' />
          <Route component={MenuPage} exact path='/menu' />
          <Route component={DishInfoPage} path='/menu/:dish_id' />
          <Route component={ContactPage} exact path='/contactus' />
          <Route component={AboutPage} exact path='/aboutus' />
          <Redirect to='/home' />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main)) ;

