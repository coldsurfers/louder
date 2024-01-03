import { createAction, handleActions } from "redux-actions";

import { Map, List } from "immutable";
import * as api from "lib/api.auth";
import { pender } from "redux-pender";
import storage from "lib/storage";

// action types
const INITIALIZE = "auth/INITIALIZE";
const REGISTER = "auth/REGISTER";
const CHANGE_INPUT = "auth/CHANGE_INPUT";

// action creator
export const initialize = createAction(INITIALIZE);
export const register = createAction(REGISTER, api.register);
export const changeInput = createAction(CHANGE_INPUT);

// initial state
const initialState = Map({
  inputs: Map({
    username: "",
    email: "",
    password: "",
    passwordCheck: "",
  }),
});

// reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) =>
      state.set(
        "inputs",
        Map({
          username: "",
          email: "",
          password: "",
          passwordCheck: "",
        })
      ),
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(["inputs", name], value);
    },
    ...pender({
      type: REGISTER,
      onSuccess: (state, action) => {
        const { user, token } = action.payload.data;
        return state.set("user", user).set("token", token);
      },
    }),
  },
  initialState
);
