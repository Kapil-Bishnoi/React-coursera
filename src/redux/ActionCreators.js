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
        .then((response) => (response.json()))
        .then((dishes) => dispatch(addDishes(dishes)));

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
        .then((response) => (response.json()))
        .then((promos) => dispatch(addPromos(promos)));
        
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
        .then((response) => (response.json()))
        .then((comments) => dispatch(addComments(comments)));

}

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const commentsFailed = (errmsg) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmsg
});
