import * as ActionTypes from './ActionTypes';
import {ServerBaseUrl} from '../shared/ServerBaseUrl';

export const addComment = (dishId,author,rating,comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        author: author,  
        rating: rating,
        comment: comment
    }
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

}

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

}

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
        
}

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const commentsFailed = (errmsg) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmsg
});
