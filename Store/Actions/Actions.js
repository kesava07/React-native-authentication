import * as actionTypes from './ActionTypes';

export const setCurrentUser = (user) => ({
    type: actionTypes.SET_CURRENT_USER,
    payLoad: user
});