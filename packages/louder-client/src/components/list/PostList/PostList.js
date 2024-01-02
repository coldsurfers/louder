import React from "react";
import classNames from "classnames/bind";
import PostItem from "components/list/PostItem/PostItem";
import styles from "./PostList.scss";

const cx = classNames.bind(styles);

const PostList = ({ posts }) => {
  const postList = Array.isArray(posts)
    ? posts.map((post, i) => (
        <PostItem
          key={post.get("id")}
          id={post.get("id")}
          title={post.get("title")}
          artist_name={post.get("artist_name")}
          song_names={post.get("song_names")}
          album_cover={post.get("album_cover")}
          album_track_file_names={post.get("album_track_file_names")}
          created_at={post.get("created_at")}
        />
      ))
    : [];
  return <div className={cx("post-list")}>{postList}</div>;
};

export default PostList;
