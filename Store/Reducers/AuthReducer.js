import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    currentUser: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payLoad
            }
        default: return state;
    }
};

export default reducer;