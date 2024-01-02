import React from "react";
import classNames from "classnames/bind";
import moment from "moment";
import { Link } from "react-router-dom";
import styles from "./PostItem.scss";

const cx = classNames.bind(styles);

const PostItem = ({
  id,
  title,
  artist_name,
  song_names,
  album_cover,
  album_track_file_names,
  created_at,
}) => {
  const splitted_cover_url = album_cover.split("/");
  const url = splitted_cover_url[splitted_cover_url.length - 1];
  return (
    <div className={cx("PostItem")}>
      <div className={cx("contents")}>
        <div className={cx("left")}>
          <Link to={`/posts/${id}`}>
            <img src={`/media/covers/${url}`} alt="listThumbnail" />
          </Link>
        </div>
        <div className={cx("right")}>
          <div className={cx("title")}>
            <Link to={`/posts/${id}`}>{title}</Link>
          </div>
          <div className={cx("artist")}>
            <Link to={`/posts/${id}`}>{artist_name}</Link>
          </div>
          <div className={cx("date")}>
            <Link to={`/posts/${id}`}>
              {moment(created_at).format("YYYY-MM-DD hh:mm")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
