import React from 'react';
import styles from './UsersMenuItems.scss';
import classNames from 'classnames/bind';
import MenuItem from '../MenuItem/MenuItem';

const cx = classNames.bind(styles);

const UsersMenuItems = () => (
  <div className={cx('wrapper')}>
    <MenuItem to="/admin/users/register" title="스태프 등록"/>
    <MenuItem to="/admin/users/member" title="유저 관리"/>
    <MenuItem to="/admin/users/staff" title="스태프 관리"/>
  </div>
);

export default UsersMenuItems;