import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as adminActions from "store/modules/admin";
import * as baseActions from "store/modules/base";
import EditorPageTemplate from "components/admin/EditorPageTemplate/EditorPageTemplate";
import EditorView from "components/admin/EditorView/EditorView";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import storage from "lib/storage";

class AdminEditorContainer extends Component {
  initialize = () => {
    const { AdminActions } = this.props;
    AdminActions.initialize();
  };

  getPostDetail = async ({ id }) => {
    const { AdminActions } = this.props;

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

  checkLogged = async () => {
    const { BaseActions, history } = this.props;

    try {
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
      await BaseActions.checkLogged(config);

      if (!this.props.is_staff) {
        history.push("/");
      }
      BaseActions.setAuthChecked();
    } catch (e) {
      history.push("/");
    }
  };

  componentDidMount() {
    this.checkLogged();
    const { location } = this.props;

    const { id } = queryString.parse(location.search);
    this.initialize();
    if (id) {
      this.getPostDetail({ id });
    }
  }

  handlePost = async (formData, config) => {
    const {
      AdminActions,
      history,
      uploaded_tracks,
      will_delete_tracks,
      location,
      will_delete_cover,
    } = this.props;
    const { id } = queryString.parse(location.search);
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
      if (will_delete_tracks.size !== 0) {
        await AdminActions.filterTracks({ will_delete_tracks }, header);
      }

      if (id) {
        if (will_delete_cover.size !== 0) {
          await AdminActions.filterCover(
            {
              will_delete_cover: will_delete_cover.toJS()[0].split("/")[
                will_delete_cover.toJS()[0].split("/").length - 1
              ],
            },
            header
          );
        }
        formData.append(
          "album_track_file_names",
          this.props.album_track_file_names.join(",")
        );
        await AdminActions.updatePost({ id }, formData, config);
        history.push(`/admin/posts/${id}/`);
        return;
      }

      if (uploaded_tracks.size === 0) {
        return;
      }

      const album_track_file_names = [];
      uploaded_tracks.toJS().map((track, i) => {
        const { url } = track;
        const splitted = url.split("/");
        const lastUrl = splitted[splitted.length - 1];
        album_track_file_names.push(lastUrl);
      });
      formData.append("album_track_file_names", album_track_file_names);

      await AdminActions.post(formData, config);
      history.push("/admin/home");
    } catch (e) {
      console.log(e);
    }
  };

  handleChangeInput = ({ name, value }) => {
    const { AdminActions } = this.props;
    AdminActions.changeInput({ name, value });
  };

  handleResetInputs = () => {
    const { AdminActions } = this.props;
    AdminActions.resetInputs();
  };

  handleUploadTracks = async (formData, config) => {
    const { AdminActions } = this.props;

    try {
      await AdminActions.uploadTracks(formData, config);
    } catch (e) {
      console.log(e);
    }
  };

  filterUploadTracks = ({ id }) => {
    const { AdminActions } = this.props;
    AdminActions.filterUploadTracks({ id });
  };

  filterUploadedTracks = ({ index }) => {
    const { AdminActions } = this.props;
    AdminActions.filterUploadedTracks({ index });
  };

  handleCoverChanged = () => {
    const { AdminActions, cover_changed } = this.props;
    if (cover_changed) return;
    AdminActions.coverChangedEditor();
  };

  render() {
    const {
      handleChangeInput,
      handlePost,
      handleResetInputs,
      handleUploadTracks,
      filterUploadTracks,
      filterUploadedTracks,
      handleCoverChanged,
    } = this;
    const {
      album_title,
      song_names,
      artist_name,
      uploaded_tracks,
      album_cover,
      album_track_file_names,
      location,
      cover_changed,
      adminChecked,
    } = this.props;
    const { id } = queryString.parse(location.search);
    if (!adminChecked) return null;
    return (
      <EditorPageTemplate>
        <EditorView
          id={id}
          onPost={handlePost}
          onChangeInput={handleChangeInput}
          onResetInput={handleResetInputs}
          onUploadTracks={handleUploadTracks}
          onFilterTracks={filterUploadTracks}
          onFilterUploaded={filterUploadedTracks}
          onChangeCoverEditor={handleCoverChanged}
          album_title={album_title}
          song_names={song_names}
          artist_name={artist_name}
          uploadedTracks={uploaded_tracks}
          album_cover={album_cover}
          album_track_file_names={album_track_file_names}
          cover_changed={cover_changed}
        />
      </EditorPageTemplate>
    );
  }
}
export default connect(
  (state) => ({
    posted: state.admin.get("posted"),
    album_title: state.admin.getIn(["inputs", "album_title"]),
    song_names: state.admin.getIn(["inputs", "song_names"]),
    artist_name: state.admin.getIn(["inputs", "artist_name"]),
    uploaded_tracks: state.admin.get("uploaded_tracks"),
    will_delete_tracks: state.admin.get("will_delete_tracks"),
    album_cover: state.admin.getIn(["editor", "album_cover"]),
    album_track_file_names: state.admin.getIn([
      "editor",
      "album_track_file_names",
    ]),
    cover_changed: state.admin.getIn(["editor", "cover_changed"]),
    will_delete_cover: state.admin.getIn(["editor", "will_delete_cover"]),
    is_staff: state.base.get("is_staff"),
    adminChecked: state.base.get("adminChecked"),
  }),
  (dispatch) => ({
    AdminActions: bindActionCreators(adminActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch),
  })
)(withRouter(AdminEditorContainer));
