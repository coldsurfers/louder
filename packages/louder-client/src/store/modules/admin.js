import { createAction, handleActions } from "redux-actions";

import { Map, List, fromJS } from "immutable";
import * as api from "lib/api.admin";
import { pender } from "redux-pender";

// action types
const INITIALIZE = "admin/INITIALIZE";
const POST = "admin/POST";
const CHANGE_INPUT = "admin/CHANGE_INPUT";
const RESET_INPUTS = "admin/RESET_INPUTS";
const GET_POST_LIST = "admin/GET_POST_LIST";
const UPLOAD_TRACKS = "admin/UPLOAD_TRACKS";
const FILTER_UPLOAD_TRACKS = "admin/FILTER_UPLOAD_TRACKS";
const FILTER_TRACKS = "admin/FILTER_TRACKS";
const GET_POST_DETAIL = "admin/GET_POST_DETAIL";
const INCREASE_CURRENT_TRACK_NUMBER = "admin/INCREASE_CURRENT_TRACK_NUMBER";
const DECREASE_CURRENT_TRACK_NUMBER = "admin/DECREASE_CURRENT_TRACK_NUMBER";
const SET_TO_ZERO = "admin/SET_TO_ZERO";
const SET_TO_LAST = "admin/SET_TO_LAST";
const SET_PLAYING = "admin/SET_PLAYING";
const SET_CURRENT_TRACK_NUMBER = "admin/SET_CURRENT_TRACK_NUMBER";
const FILTER_UPLOADED_TRACKS = "admin/FILTER_UPLOADED_TRACKS";
const ADD_UPLOADED_TRACKS = "admin/ADD_UPLOADED_TRACKS";
const REMOVE_ALBUM_COVER = "admin/REMOVE_ALBUM_COVER";
const UPDATE_POST = "admin/UPDATE_POST";
const COVER_CHANGED_EDITOR = "admin/COVER_CHANGED_EDITOR";
const FILTER_COVER = "admin/FILTER_COVER";
const UNMOUNT_POST = "admin/UNMOUNT_POST";
const REMOVE_POST = "admin/REMOVE_POST";
const REGISTER_STAFF = "admin/REGISTER_STAFF";
const GET_USER_LIST = "admin/GET_USER_LIST";
const GET_STAFF_LIST = "admin/GET_STAFF_LIST";
const SET_PAGE = "admin/SET_PAGE";
const DELETE_USER = "admin/DELETE_USER";
const DELETE_STAFF = "admin/DELETE_STAFF";

// action creator
export const initialize = createAction(INITIALIZE);
export const post = createAction(POST, api.post);
export const changeInput = createAction(CHANGE_INPUT);
export const resetInputs = createAction(RESET_INPUTS);
export const getPostList = createAction(GET_POST_LIST, api.getPostList);
export const uploadTracks = createAction(UPLOAD_TRACKS, api.uploadTracks);
export const filterUploadTracks = createAction(FILTER_UPLOAD_TRACKS);
export const filterTracks = createAction(FILTER_TRACKS, api.filterTracks);
export const getPostDetail = createAction(GET_POST_DETAIL, api.getPostDetail);
export const increaseCurrentTrackNumber = createAction(
  INCREASE_CURRENT_TRACK_NUMBER
);
export const decreaseCurrentTrackNumber = createAction(
  DECREASE_CURRENT_TRACK_NUMBER
);
export const setToZero = createAction(SET_TO_ZERO);
export const setToLast = createAction(SET_TO_LAST);
export const setPlaying = createAction(SET_PLAYING);
export const setCurrentTrackNumber = createAction(SET_CURRENT_TRACK_NUMBER);
export const filterUploadedTracks = createAction(FILTER_UPLOADED_TRACKS);
export const addUploadedTracks = createAction(ADD_UPLOADED_TRACKS);
export const removeAlbumCover = createAction(REMOVE_ALBUM_COVER);
export const updatePost = createAction(UPDATE_POST, api.updatePost);
export const coverChangedEditor = createAction(COVER_CHANGED_EDITOR);
export const filterCover = createAction(FILTER_COVER, api.filterCover);
export const unmountPost = createAction(UNMOUNT_POST);
export const removePost = createAction(REMOVE_POST, api.removePost);
export const registerStaff = createAction(REGISTER_STAFF, api.registerStaff);
export const getUserList = createAction(GET_USER_LIST, api.getUserList);
export const getStaffList = createAction(GET_STAFF_LIST, api.getStaffList);
export const setPage = createAction(SET_PAGE);
export const deleteUser = createAction(DELETE_USER, api.deleteUser);
export const deleteStaff = createAction(DELETE_STAFF, api.deleteStaff);

// initial state
const initialState = Map({
  posted: Map({}),
  inputs: Map({
    album_title: "",
    song_names: "",
    artist_name: "",
    username: "",
    password: "",
    email: "",
  }),
  posts: Map({
    count: null,
    next: "",
    previous: "",
    results: List(),
  }),
  song_files: List(),
  uploaded_track_file_name: "",
  uploaded_tracks: List(),
  will_delete_tracks: List(),
  post: Map({}),
  album: Map({
    album_tracks: List(),
    album_track_length: null,
    current_track_number: null,
    last_track_number: null,
    playing: false,
  }),
  editor: Map({
    album_cover: "",
    album_track_file_names: List(),
    cover_changed: false,
    will_delete_cover: List(),
  }),
  userList: List(),
  users: Map({
    count: null,
    next: null,
    previous: null,
    page: 1,
  }),
});

// reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) =>
      state
        .set(
          "inputs",
          Map({
            album_title: "",
            song_names: "",
            artist_name: "",
            username: "",
            password: "",
            email: "",
          })
        )
        .set(
          "editor",
          Map({
            album_cover: "",
            album_track_file_names: List(),
            cover_changed: false,
            will_delete_cover: List(),
          })
        )
        .set("uploaded_tracks", List()),
    ...pender({
      type: POST,
      onSuccess: (state, action) => {
        const { data: post } = action.payload;
        return state.set("posted", post);
      },
    }),
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(["inputs", name], value);
    },
    [RESET_INPUTS]: (state, action) =>
      state.set(
        "inputs",
        Map({
          album_title: "",
          song_names: "",
          artist_name: "",
        })
      ),
    ...pender({
      type: GET_POST_LIST,
      onSuccess: (state, action) => {
        const { count, next, previous, results } = action.payload.data;
        return state
          .setIn(["posts", "count"], count)
          .setIn(["posts", "next"], next)
          .setIn(["posts", "previous"], previous)
          .setIn(["posts", "results"], fromJS(results));
      },
    }),
    ...pender({
      type: UPLOAD_TRACKS,
      onSuccess: (state, action) => {
        const { data: uploaded } = action.payload;
        return state
          .set("uploaded_track_file_name", uploaded.track_file)
          .set(
            "uploaded_tracks",
            state.get("uploaded_tracks").push({
              id: uploaded.id,
              url: uploaded.track_file,
            })
          )
          .setIn(
            ["editor", "album_track_file_names"],
            state
              .getIn(["editor", "album_track_file_names"])
              .concat(
                uploaded.track_file.split("/")[
                  uploaded.track_file.split("/").length - 1
                ]
              )
          );
      },
    }),
    [FILTER_UPLOAD_TRACKS]: (state, action) => {
      const { id } = action.payload;
      const index = state
        .get("uploaded_tracks")
        .toJS()
        .findIndex((track, i) => track.id === parseInt(id, 10));
      const willDeleteTrack = state.get("uploaded_tracks").get(index);
      // console.log(willDeleteTrack.url.split("/"));
      const trackUrl = willDeleteTrack.url;
      const splitted_url = trackUrl.split("/");
      const willDeleteUrl = splitted_url[splitted_url.length - 1];
      return state
        .set(
          "will_delete_tracks",
          state.get("will_delete_tracks").push(willDeleteUrl)
        )
        .update("uploaded_tracks", (trackList) =>
          trackList.splice(parseInt(index, 10), 1)
        );
    },
    ...pender({
      type: GET_POST_DETAIL,
      onSuccess: (state, action) => {
        const { data: post } = action.payload;
        return state
          .set("post", post)
          .setIn(["album", "album_tracks"], post.album_track_file_names)
          .setIn(
            ["album", "album_track_length"],
            post.album_track_file_names.length
          )
          .setIn(["album", "current_track_number"], 0)
          .setIn(
            ["album", "last_track_number"],
            post.album_track_file_names.length - 1
          )
          .setIn(["inputs", "album_title"], post.title)
          .setIn(["inputs", "artist_name"], post.artist_name)
          .setIn(["inputs", "song_names"], post.song_names)
          .setIn(["editor", "album_cover"], post.album_cover)
          .setIn(
            ["editor", "album_track_file_names"],
            post.album_track_file_names
          );
      },
    }),
    [INCREASE_CURRENT_TRACK_NUMBER]: (state, action) => {
      const current_track_number = state.getIn([
        "album",
        "current_track_number",
      ]);
      return state.setIn(
        ["album", "current_track_number"],
        parseInt(current_track_number, 10) + 1
      );
    },
    [DECREASE_CURRENT_TRACK_NUMBER]: (state, action) => {
      const current_track_number = state.getIn([
        "album",
        "current_track_number",
      ]);
      return state.setIn(
        ["album", "current_track_number"],
        parseInt(current_track_number, 10) - 1
      );
    },
    [SET_TO_ZERO]: (state, action) =>
      state.setIn(["album", "current_track_number"], 0),
    [SET_TO_LAST]: (state, action) => {
      const lastNumber = state.getIn(["album", "last_track_number"]);
      return state.setIn(["album", "current_track_number"], lastNumber);
    },
    [SET_PLAYING]: (state, action) => {
      const isPlaying = state.getIn(["album", "playing"]);
      // if(isPlaying) {
      //     return state.setIn(['album', 'playing'], false);
      // }
      return state.setIn(["album", "playing"], !isPlaying);
    },
    [SET_CURRENT_TRACK_NUMBER]: (state, action) => {
      const { track_number } = action.payload;
      return state.setIn(["album", "current_track_number"], track_number);
    },
    [FILTER_UPLOADED_TRACKS]: (state, action) => {
      const { index } = action.payload;
      let editorTracks = state.getIn(["editor", "album_track_file_names"]);
      let willDeleteTracks = "";
      editorTracks = editorTracks.filter((track, i) => {
        if (i === parseInt(index, 10)) {
          willDeleteTracks = editorTracks[i];
        }
        return i !== parseInt(index, 10);
      });

      return state
        .setIn(["editor", "album_track_file_names"], editorTracks)
        .update("will_delete_tracks", (value) =>
          value.concat(willDeleteTracks)
        );
    },
    [COVER_CHANGED_EDITOR]: (state, action) =>
      state
        .setIn(["editor", "cover_changed"], true)
        .setIn(
          ["editor", "will_delete_cover"],
          state
            .getIn(["editor", "will_delete_cover"])
            .push(state.getIn(["editor", "album_cover"]))
        ),
    [UNMOUNT_POST]: (state, action) =>
      state.set(
        "album",
        Map({
          album_tracks: List(),
          album_track_length: null,
          current_track_number: null,
          last_track_number: null,
          playing: false,
        })
      ),
    ...pender({
      type: GET_USER_LIST,
      onSuccess: (state, action) => {
        const { results, count, next, previous } = action.payload.data;
        return state
          .set("userList", fromJS(results))
          .setIn(["users", "count"], count)
          .setIn(["users", "next"], next)
          .setIn(["users", "previous"], previous);
      },
    }),
    ...pender({
      type: GET_STAFF_LIST,
      onSuccess: (state, action) => {
        const { results, count, next, previous } = action.payload.data;
        return state
          .set("userList", fromJS(results))
          .setIn(["users", "count"], count)
          .setIn(["users", "next"], next)
          .setIn(["users", "previous"], previous);
      },
    }),
    [SET_PAGE]: (state, action) => {
      const { page } = action.payload;
      return state.setIn(["users", "page"], parseInt(page, 10));
    },
  },
  initialState
);
