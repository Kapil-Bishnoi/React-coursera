import {DISHES} from '../shared/dishes';
import {PROMOTIONS} from '../shared/promotions';
import {LEADERS} from '../shared/leaders';
import {COMMENTS} from '../shared/comments';

export const initialState = {
    dishes: DISHES,
    comments: COMMENTS,
    leaders: LEADERS,
    promotions: PROMOTIONS,
    // isCommentModalOpen: false
};
export const initialFeedbackFormState = {
    fullname: '',
    telnum: '',
    email: '',
    isAgree: false,
    contactType: "Tel.",
    message: ''
}

export const Reducer = (state=initialState,action) => { //(state=initialState) is used to set default value to undefined object or var 
    return state;
}