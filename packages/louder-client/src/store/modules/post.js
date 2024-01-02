import { createAction, handleActions } from "redux-actions";

import { Map, List } from "immutable";
import * as adminApi from "lib/api.admin";
import { pender } from "redux-pender";

// action types
const GET_POST_DETAIL = "post/GET_POST_DETAIL";
const PLAY_NEXT = "post/PLAY_NEXT";
const PLAY_PREV = "post/PLAY_PREV";
const SET_PLAYING = "post/SET_PLAYING";
const SET_STOP = "post/SET_STOP";
const SELECT_SONG = "post/SELECT_SONG";
const INITIALIZE = "post/INITIALIZE";

// action creator
export const getPostDetail = createAction(
  GET_POST_DETAIL,
  adminApi.getPostDetail
);
export const playNext = createAction(PLAY_NEXT);
export const playPrev = createAction(PLAY_PREV);
export const setPlaying = createAction(SET_PLAYING);
export const setStop = createAction(SET_STOP);
export const selectSong = createAction(SELECT_SONG);
export const initialize = createAction(INITIALIZE);

// initial state
const initialState = Map({
  postDetail: Map({}),
  tracks: List(),
  player: Map({
    current: 0,
    length: null,
    playing: false,
    url: "",
  }),
});

// reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => initialState,
    ...pender({
      type: GET_POST_DETAIL,
      onSuccess: (state, action) => {
        const { data: post } = action.payload;
        const { album_track_file_names } = post;
        const trackArr = album_track_file_names.split(",");

        return state
          .set("postDetail", post)
          .set("tracks", trackArr)
          .setIn(["player", "length"], trackArr.length)
          .setIn(["player", "url"], `/media/tracks/${trackArr[0]}`);
      },
    }),
    [PLAY_NEXT]: (state, action) => {
      const current = state.getIn(["player", "current"]);
      const length = state.getIn(["player", "length"]);
      if (current === length - 1) {
        const tracks = state.get("tracks");
        const url = `/media/tracks/${tracks[0]}`;
        return state
          .setIn(["player", "current"], 0)
          .setIn(["player", "url"], url);
      }
      const tracks = state.get("tracks");
      const url = `/media/tracks/${
        tracks[parseInt(state.getIn(["player", "current"]), 10) + 1]
      }`;
      return state
        .setIn(["player", "current"], parseInt(current, 10) + 1)
        .setIn(["player", "url"], url);
    },
    [PLAY_PREV]: (state, action) => {
      const current = state.getIn(["player", "current"]);
      const length = state.getIn(["player", "length"]);
      if (current === 0) {
        const tracks = state.get("tracks");
        const url = `/media/tracks/${tracks[tracks.length - 1]}`;
        return state
          .setIn(["player", "current"], length - 1)
          .setIn(["player", "url"], url);
      }
      const tracks = state.get("tracks");
      const url = `/media/tracks/${
        tracks[parseInt(state.getIn(["player", "current"]), 10) - 1]
      }`;
      return state
        .setIn(["player", "current"], parseInt(current, 10) - 1)
        .setIn(["player", "url"], url);
    },
    [SET_PLAYING]: (state, action) => state.setIn(["player", "playing"], true),
    [SET_STOP]: (state, action) => state.setIn(["player", "playing"], false),
    [SELECT_SONG]: (state, action) => {
      const { index } = action.payload;
      const tracks = state.get("tracks");
      const url = `/media/tracks/${tracks[parseInt(index, 10)]}`;
      return state
        .setIn(["player", "current"], parseInt(index, 10))
        .setIn(["player", "url"], url);
    },
  },
  initialState
);
