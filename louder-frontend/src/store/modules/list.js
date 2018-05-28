import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import * as api from 'lib/api.list';
import { pender } from 'redux-pender';

// action types
const GET_POST_LIST = 'list/GET_POST_LIST';

// action creator
export const getPostList = createAction(GET_POST_LIST, api.getPostList);

// initial state
const initialState = Map({
    postList: List(),
    nextPage: null,
    prevPage: null,
    count: null
});

// reducer
export default handleActions({
    ...pender({
        type: GET_POST_LIST,
        onSuccess: (state, action) => {
            const { results: posts, next, previous, count } = action.payload.data;
            return state.set('postList', fromJS(posts))
                        .set('nextPage', next)
                        .set('prevPage', previous)
                        .set('count', count);
        }   
    })
}, initialState);