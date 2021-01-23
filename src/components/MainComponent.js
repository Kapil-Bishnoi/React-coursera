import React from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailsComponent';
import { Switch,Route,Redirect,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import {TransitionGroup,CSSTransition} from 'react-transition-group';
   
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
  postComment: (dishId,author,rating,comment) => {dispatch(postComment(dishId,author,rating,comment))},
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchComments: () => {dispatch(fetchComments())}
});

class Main extends React.Component{

  constructor(props){
    super(props);  
  }

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchPromos();
    this.props.fetchComments();
  }

  render() {

    const HomePage = ()=>{
      return(
        <Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured===true)[0]}
              isdishesLoading={this.props.dishes.isLoading}
              dishesErrMsg={this.props.dishes.errMsg}
              promotion={this.props.promotions.promotions.filter((pro)=>pro.featured===true)[0]}
              ispromosLoading={this.props.promotions.isLoading}
              promosErrMsg={this.props.promotions.errMsg}
              leader={this.props.leaders.filter((lead)=>lead.featured===true)[0]} />
      );
    }
    const MenuPage = ()=>{
      return(
        <Menu dishes={this.props.dishes} />
      );
    }
    const DishInfoPage = ({match})=>{
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish)=> dish.id=== parseInt(match.params.dish_id,10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    dishesErrMsg={this.props.dishes.errMsg}
                    comments={this.props.comments.comments.filter((comment)=> comment.dishId===parseInt(match.params.dish_id,10))}
                    commentsErrMsg={this.props.comments.errMsg}
                    postComment={this.props.postComment}
        />
      );
    }
    const ContactPage = () => {
      return(
        <Contact resetFeedbackForm={this.props.resetFeedbackForm} />
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
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300} >
              <Switch>
                <Route component={HomePage} path='/home' />
                <Route component={MenuPage} exact path='/menu' />
                <Route component={DishInfoPage} path='/menu/:dish_id' />
                <Route component={ContactPage} exact path='/contactus' />
                <Route component={AboutPage} exact path='/aboutus' />
                <Redirect to='/home' />
              </Switch>
            </CSSTransition> 
          </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main)) ;

