import React from "react";
import classNames from "classnames/bind";
import Player from "components/admin/Player";
import styles from "./Post.scss";

const cx = classNames.bind(styles);

const Post = ({
  id,
  post,
  album_tracks,
  album_track_length,
  current_track_number,
  last_track_number,
  increaseCurrentTrackNumber,
  decreaseCurrentTrackNumber,
  setToZero,
  setToLast,
  setPlaying,
  isPlaying,
  setCurrentTrackNumber,
  onToggleSettingMenu,
  settingVisible,
  onUnmount,
}) => {
  if (post.size === 0) {
    return null;
  }
  return (
    <div className={cx("Post")}>
      <div className={cx("contents")}>
        <Player
          id={id}
          post={post}
          album_tracks={album_tracks}
          album_track_length={album_track_length}
          current_track_number={current_track_number}
          last_track_number={last_track_number}
          onIncrease={increaseCurrentTrackNumber}
          onDecrease={decreaseCurrentTrackNumber}
          onUnmount={onUnmount}
          setToZero={setToZero}
          setToLast={setToLast}
          setPlaying={setPlaying}
          isPlaying={isPlaying}
          setCurrentTrackNumber={setCurrentTrackNumber}
          onToggle={onToggleSettingMenu}
          settingVisible={settingVisible}
        />
      </div>
    </div>
  );
};
export default Post;
