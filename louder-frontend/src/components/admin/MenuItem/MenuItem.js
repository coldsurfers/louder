import React from 'react';
import styles from './MenuItem.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const MenuItem = ({to, title}) => {
  return (
    <div className={cx('MenuItem')}>
      <div className={cx('Contents')}>
        <Link to={to} className={cx('title')}>
          {title}
        </Link>
      </div>
    </div>
  );
}

export default MenuItem;