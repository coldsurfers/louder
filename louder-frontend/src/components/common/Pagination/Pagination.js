import React from 'react';
import styles from './Pagination.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button/Button';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Pagination = ({count, next, previous, page, what}) => {
  console.log(next, previous);
  let splittedNext = null;
  let nextUrl = null;
  let splittedPrev = null;
  let prevUrl = null;
  if(next !== null) {
    splittedNext = next.split("/?");
    nextUrl = splittedNext[splittedNext.length - 1];
  }
  if(previous !== null) {
    splittedPrev = previous.split("/?");
    if(splittedPrev.length === 1) {
      prevUrl = "page=1";
      
    } else {
      prevUrl = splittedPrev[splittedPrev.length - 1];
    }
    
  }

  let path = "";
  if(what === "adminPosts") {
    path = "/admin/posts/";
  }
  if(what === "userList") {
    path = "/admin/users/member/";
  }
  if(what === "homeList") {
    path="/";
  }
  
  return (
    <div className={cx('Pagination')}>
      <div className={cx('prev')}>
        <Link to={`${path}${parseInt(page, 10) - 1}`} style={{display: previous === null ? "none" : "block"}} className={cx('button')}>Prev</Link>
      </div>
      <div className={cx('page')}>
        1 page
      </div>
      <div className={cx('next')}>
        <Link to={`${path}${parseInt(page, 10) + 1}`} style={{display: next === null ? "none" : "block"}} className={cx('button')}>Next</Link>
      </div>
    </div>
  );
}

export default Pagination;