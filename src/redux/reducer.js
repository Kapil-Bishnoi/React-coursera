import {DISHES} from '../shared/dishes';
import {PROMOTIONS} from '../shared/promotions';
import {LEADERS} from '../shared/leaders';
import {COMMENTS} from '../shared/comments';

export const initialState = {
    dishes: DISHES,
    comments: COMMENTS,
    leaders: LEADERS,
    promotions: PROMOTIONS
};

export const Reducer = (state=initialState,action) => { //(state=initialState) is used to set default value to undefined object or var 
    return state;
}