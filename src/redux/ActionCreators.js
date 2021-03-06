import * as ActionTypes from './ActionTypes';
import {ServerBaseUrl} from '../shared/ServerBaseUrl';

export const postComment = (dishId,author,rating,comment) => (dispatch) => { //thunk

    const newComment = {
        dishId: dishId,
        author: author,  
        rating: rating,
        comment: comment
    };
    newComment.date = new Date().toISOString();

    return (
        fetch(ServerBaseUrl + 'comments', {
                method: 'POST',
                body: JSON.stringify(newComment),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin'
            })
            .then((response) => {
                if(response.ok){
                    return response;
                }
                else{
                    let error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },(error) => {
                let errMsg = new Error(error.message);
                throw errMsg;
            })
            .then((response) => (response.json()))
            .then((comment) => dispatch(addComment(comment)))
            .catch(error => {
                console.log(`Post Comment Error is ${error.message}`);
                alert(`Sorry your comment couldn't be posted\nError: ${error.message}`);
            })
    );
};

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const fetchDishes = () => (dispatch) => { //thunk
    dispatch(dishesLoading(true));

    fetch(ServerBaseUrl + 'dishes')
        .then((response) => {
            if(response.ok){
                return response;
            }
            else{
                let error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },(error) => {
            let errMsg = new Error(error.message);
            throw errMsg;
        })
        .then((response) => (response.json()))
        .then((dishes) => dispatch(addDishes(dishes)))
        .catch((error) => dispatch(dishesFailed(error.message)));

};

export const dishesLoading = () => ({ 
    type: ActionTypes.DISHES_LOADING,
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const dishesFailed = (errmsg) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmsg
});

export const fetchPromos = () => (dispatch) => { //thunk
    dispatch(promosLoading(true));

    fetch(ServerBaseUrl + 'promotions')
        .then((response) => {
            if(response.ok){
                return response;
            }
            else{
                let error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },(error) => {
            let errMsg = new Error(error.message);
            throw errMsg;
        })
        .then((response) => (response.json()))
        .then((promos) => dispatch(addPromos(promos)))
        .catch((error) => dispatch(promosFailed(error.message)));

};

export const promosLoading = () => ({ 
    type: ActionTypes.PROMOS_LOADING,
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const promosFailed = (errmsg) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmsg
});

export const fetchComments = () => (dispatch) => { //thunk 
    fetch(ServerBaseUrl + 'comments')
        .then((response) => {
            if(response.ok){
                return response;
            }
            else{
                let error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },(error) => {
            let errMsg = new Error(error.message);
            throw errMsg;
        })
        .then((response) => (response.json()))
        .then((comments) => dispatch(addComments(comments)))
        .catch((error) => dispatch(commentsFailed(error.message)));
        
};

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const commentsFailed = (errmsg) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmsg
});

export const fetchLeaders = () => (dispatch) => { //thunk
    dispatch(leadersLoading(true));

    fetch(ServerBaseUrl + 'leaders')
        .then((response) => {
            if(response.ok){
                return response;
            }
            else{
                let error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },(error) => {
            let errMsg = new Error(error.message);
            throw errMsg;
        })
        .then((response) => (response.json()))
        .then((leaders) => dispatch(addLeaders(leaders)))
        .catch((error) => dispatch(leadersFailed(error.message)));

};

export const leadersLoading = () => ({ 
    type: ActionTypes.LEADERS_LOADING,
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const leadersFailed = (errmsg) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmsg
});

export const postFeedbackForm = (feedback) => (dispatch) => {

    const newFeedback = {
        fullname: feedback.fullname,
        telnum: feedback.telnum,
        email: feedback.email,
        isAgree: feedback.isAgree,
        contactType: feedback.contactType,
        message: feedback.message
    }
    newFeedback.date = new Date().toISOString();

    return (
        fetch(ServerBaseUrl + 'feedback', {
                method: 'POST',
                body: JSON.stringify(newFeedback),
                headers:{
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin'
            })
            .then((response) => {
                if(response.ok){
                    return response;
                }
                else{
                    let error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            }, error => {
                let errMsg = new Error(error.message);
                throw errMsg;
            })
            .then(response => { return response.json() })
            .then((feedback) => {
                console.log(`Feedback is submitted successfully\n${feedback}`);
                alert(`Feedback is submitted successfully\n${feedback}`);

                dispatch(addFeedbackForm(feedback));
            })
            .catch((error) => {
                console.log(`Error in submitting the feedback form: ${error.message}`);
                alert(`Error in submitting the feedback form: ${error.message}`);

            })
    );
};

export const addFeedbackForm = (feedback) => ({
    type: ActionTypes.ADD_FEEDBACKFORM,
    payload: feedback
});