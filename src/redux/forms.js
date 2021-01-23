import * as ActionTypes from './ActionTypes';

export const InitialFeedback = {
    fullname: '',
    telnum: '',
    email: '',
    isAgree: false,
    contactType: 'Tel.',
    message: '',
};

export const Forms = (state = {
        feedbacks: [],
    },action ) => {
        switch(action.type){
            case ActionTypes.ADD_FEEDBACKFORM:
                return {...state, feedbacks: state.feedbacks.concat(action.payload)};

            default:
                return state;
        }
}
