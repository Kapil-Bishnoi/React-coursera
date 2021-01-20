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
import {addComment, fetchDishes } from '../redux/ActionCreators';


const mapStateToProps = (state) =>{ //maping redux state to props
  return(
    {
      dishes: state.dishes,
      comments: state.comments,
      leaders: state.leaders,
      promotions: state.promotions,
    }
  );
}
const mapDispatchToProps = (dispatch) =>({
  addComment: (dishId,author,rating,comment) => dispatch(addComment(dishId,author,rating,comment)),
  fetchDishes: () => {dispatch(fetchDishes())}
});

class Main extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      enteredDishId: null
    };
    
  }

  componentDidMount(){
    this.props.fetchDishes();
  }

  onDishEnter(dishId){
    this.setState({
        enteredDishId:dishId
    });
  }
  displayLittleDishInfo(dish){
    if(this.state.enteredDishId!==null && this.state.enteredDishId===dish.id){
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
        <Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured===true)[0]}
              isdishesLoading={this.props.dishes.isLoading}
              dishesErrMsg={this.props.dishes.errMsg}
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
        <DishDetail dish={this.props.dishes.dishes.filter((dish)=> dish.id=== parseInt(match.params.dish_id,10))[0]}
        isLoading={this.props.dishes.isLoading}
        errMsg={this.props.dishes.errMsg}
        comments={this.props.comments.filter((c)=> c.dishId===parseInt(match.params.dish_id,10))}
        addComment={this.props.addComment}
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
        <Header />
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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main)) ;

