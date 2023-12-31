import React from 'react';
import styles from './PostList.scss';
import classNames from 'classnames/bind';
import PostItem from 'components/admin/PostItem/PostItem';

const cx = classNames.bind(styles);

const PostList = ({posts}) => {

  const postList = posts.map(
    (post, i) => {
      return (
        <PostItem 
          key={post.get('id')}
          id={post.get('id')}
          title={post.get('title')}
          artist_name={post.get('artist_name')}
          song_names={post.get('song_names')}
          album_cover={post.get('album_cover')}
          created_at={post.get('created_at')}/>
      )
    }
  );

  return (
    <div className={cx('wrapper')}>
      <div className={cx('list')}>
        {
          postList
        }
      </div>
    </div>
  );
}

export default PostList;