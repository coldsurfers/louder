import React from "react";
import classNames from "classnames/bind";
import moment from "moment";
import { Link } from "react-router-dom";
import styles from "./PostItem.scss";

const cx = classNames.bind(styles);

const PostItem = ({
  title,
  artist_name,
  song_names,
  created_at,
  album_cover,
  id,
}) => (
  <Link to={`/admin/posts/${id}`}>
    <div className={cx("PostItem")}>
      <div className={cx("contents")}>
        <div className={cx("ImageWrapper")}>
          <img src={album_cover} alt="postImage" />
        </div>
        <div className={cx("RightWrapper")}>
          <div className={cx("title")}>{title}</div>
          <div className={cx("artist-name")}>by {artist_name}</div>
          <div className={cx("created-at")}>
            posted at: {moment(created_at).format("YYYY-MM-DD hh:mm")}
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default PostItem;
