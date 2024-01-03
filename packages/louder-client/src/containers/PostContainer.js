import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as adminActions from "store/modules/admin";
import * as baseActions from "store/modules/base";
import Post from "components/admin/Post/Post";
import { withRouter } from "react-router-dom";
import storage from "lib/storage";
import SettingMenuContainer from "./SettingMenuContainer";

class PostContainer extends Component {
  getPostDetail = async () => {
    const { AdminActions, id } = this.props;
    let config = null;
    const token = storage.get("token");

    if (token) {
      config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
    }
    try {
      await AdminActions.getPostDetail({ id }, config);
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.getPostDetail();
  }

  increaseCurrentTrackNumber = () => {
    const { AdminActions } = this.props;
    AdminActions.increaseCurrentTrackNumber();
  };

  decreaseCurrentTrackNumber = () => {
    const { AdminActions } = this.props;
    AdminActions.decreaseCurrentTrackNumber();
  };

  setToZero = () => {
    const { AdminActions } = this.props;
    AdminActions.setToZero();
  };

  setToLast = () => {
    const { AdminActions } = this.props;
    AdminActions.setToLast();
  };

  setPlaying = () => {
    const { AdminActions } = this.props;
    AdminActions.setPlaying();
  };

  setCurrentTrackNumber = ({ track_number }) => {
    const { AdminActions } = this.props;
    AdminActions.setCurrentTrackNumber({ track_number });
  };

  toggleSettingMenu = () => {
    const { BaseActions } = this.props;
    BaseActions.toggleSettingMenu();
  };

  handleUnmount = () => {
    const { AdminActions } = this.props;
    AdminActions.unmountPost();
  };

  handleRemovePost = async () => {
    const { AdminActions, id, album_tracks, album_cover, post, history } =
      this.props;
    let header = null;
    const token = storage.get("token");

    if (token) {
      header = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
    }
    try {
      await AdminActions.filterTracks(
        { will_delete_tracks: album_tracks },
        header
      );
      await AdminActions.filterCover({ will_delete_cover: post.album_cover }, header);
      await AdminActions.removePost({ id }, header);
      history.push("/admin/posts/");
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const {
      post,
      loading,
      album_tracks,
      album_track_length,
      current_track_number,
      last_track_number,
      isPlaying,
      settingVisible,
      id,
    } = this.props;
    const {
      increaseCurrentTrackNumber,
      decreaseCurrentTrackNumber,
      setToZero,
      setToLast,
      setPlaying,
      setCurrentTrackNumber,
      toggleSettingMenu,
      handleUnmount,
      handleRemovePost,
    } = this;
    if (loading) return null;
    return (
      <Fragment>
        <Post
          id={id}
          post={post}
          album_tracks={album_tracks}
          album_track_length={album_track_length}
          current_track_number={current_track_number}
          last_track_number={last_track_number}
          increaseCurrentTrackNumber={increaseCurrentTrackNumber}
          decreaseCurrentTrackNumber={decreaseCurrentTrackNumber}
          onUnmount={handleUnmount}
          setToZero={setToZero}
          setToLast={setToLast}
          setPlaying={setPlaying}
          isPlaying={isPlaying}
          setCurrentTrackNumber={setCurrentTrackNumber}
          onToggleSettingMenu={toggleSettingMenu}
          settingVisible={settingVisible}
        />
        <SettingMenuContainer id={id} onRemovePost={handleRemovePost} />
      </Fragment>
    );
  }
}
export default connect(
  (state) => ({
    post: state.admin.get("post"),
    loading: state.pender.pending["admin/GET_POST_DETAIL"],
    album_tracks: state.admin.getIn(["album", "album_tracks"]),
    album_track_length: state.admin.getIn(["album", "album_track_length"]),
    current_track_number: state.admin.getIn(["album", "current_track_number"]),
    last_track_number: state.admin.getIn(["album", "last_track_number"]),
    isPlaying: state.admin.getIn(["album", "playing"]),
    settingVisible: state.base.getIn(["visible", "settingMenu"]),
  }),
  (dispatch) => ({
    AdminActions: bindActionCreators(adminActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch),
  })
)(withRouter(PostContainer));
