import React, { Component } from "react";
import classNames from "classnames/bind";
import storage from "lib/storage";
import styles from "./EditorView.scss";

const cx = classNames.bind(styles);

class EditorView extends Component {
  handleChange = (e) => {
    const { name, value } = e.target;
    const { onChangeInput } = this.props;
    onChangeInput({ name, value });
  };

  handleUpload = (e) => {
    const { onPost, id, cover_changed, album_title, artist_name, song_names } =
      this.props;
    const coverFile = document.getElementById("album_cover").files[0];
    const token = storage.get("token");
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const formData = new FormData();
    if (id) {
      if (cover_changed) {
        formData.append("album_cover", coverFile);
      }
      formData.append("title", album_title);
      formData.append("artist_name", artist_name);
      formData.append("song_names", song_names);
    } else {
      formData.append("album_cover", coverFile);
      formData.append("title", album_title);
      formData.append("artist_name", artist_name);
      formData.append("song_names", song_names);
    }

    onPost(formData, config);
  };

  handleUploadTrack = (e) => {
    const { onUploadTracks } = this.props;
    const trackFile = document.getElementById("album_track").files[0];
    // console.log(trackFile);
    const formData = new FormData();
    formData.append("track_file", trackFile);
    const token = storage.get("token");
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    onUploadTracks(formData, config);
  };

  handleFilterTrack = (e) => {
    const { onFilterTracks } = this.props;
    const { id } = e.target;
    onFilterTracks({ id });
  };

  handleFilterUploaded = (e) => {
    const { onFilterUploaded } = this.props;
    const { id } = e.target;
    onFilterUploaded({ index: id });
  };

  handleChangeCover = (e) => {
    const { onChangeCoverEditor, id } = this.props;
    if (id) {
      onChangeCoverEditor();
    }
  };

  render() {
    const {
      uploadedTracks,
      album_track_file_names,
      album_title,
      album_cover,
      artist_name,
      song_names,
      onResetInput,
      id,
    } = this.props;
    const {
      handleFilterTrack,
      handleFilterUploaded,
      handleChange,
      handleChangeCover,
      handleUploadTrack,
      handleUpload,
    } = this;
    const uploadedList = uploadedTracks.map((track, i) => (
      <div key={track.id} id={track.id}>
        {track.url}
        <span
          id={track.id}
          style={{ marginLeft: "1rem", cursor: "pointer" }}
          onClick={handleFilterTrack}
        >
          지우기
        </span>
      </div>
    ));
    const uploaded_album_tracks = album_track_file_names.map((track, i) => (
      <div id={i} key={i}>
        {track}{" "}
        <span
          id={i}
          style={{ cursor: "pointer" }}
          onClick={handleFilterUploaded}
        >
          지우기
        </span>
      </div>
    ));
    return (
      <div className={cx("view")}>
        <div className={cx("contents")}>
          <div className={cx("line")}>
            <div className={cx("label")}>앨범 타이틀</div>
            <div className={cx("input-wrapper")}>
              <input
                type="text"
                name="album_title"
                className={cx("input")}
                value={album_title}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={cx("line")}>
            <div className={cx("label")}>아티스트 이름</div>
            <div className={cx("input-wrapper")}>
              <input
                type="text"
                name="artist_name"
                className={cx("input")}
                value={artist_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={cx("line")}>
            <div className={cx("label")}>노래 이름 (,로 구분)</div>
            <div className={cx("input-wrapper")}>
              <input
                type="text"
                name="song_names"
                className={cx("input")}
                value={song_names}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={cx("line")}>
            <div className={cx("label")}>커버 사진</div>
            <div className={cx("input-wrapper")}>
              <input
                type="file"
                name="album_cover"
                id="album_cover"
                className={cx("input")}
                onChange={handleChangeCover}
              />
            </div>
            <div className={cx("cover-text")}>
              {album_cover.split("/")[album_cover.split("/").length - 1]}
            </div>
          </div>
          <div className={cx("line")}>
            <div className={cx("label")}>앨범 트랙 파일</div>
            <div className={cx("input-wrapper")}>
              <input
                type="file"
                name="album_track"
                id="album_track"
                className={cx("input")}
                onChange={handleUploadTrack}
              />
            </div>
            <div className={cx("uploaded-list")}>
              {id ? uploaded_album_tracks : uploadedList}
            </div>
          </div>
          <div className={cx("button-wrapper")}>
            <div className={cx("button", "submit")} onClick={handleUpload}>
              작성하기
            </div>
            <div className={cx("button", "reset")} onClick={onResetInput}>
              리셋하기
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditorView;
