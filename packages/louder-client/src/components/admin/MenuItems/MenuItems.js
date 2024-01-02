import React from "react";
import classNames from "classnames/bind";
import MenuItem from "components/admin/MenuItem/MenuItem";
import styles from "./MenuItems.scss";

const cx = classNames.bind(styles);

const MenuItems = () => (
  <div className={cx("MenuItems")}>
    <div className={cx("Contents")}>
      <MenuItem to="/admin/editor" title="포스팅 하기" />
      <MenuItem to="/admin/users" title="유저 관리" />
      <MenuItem to="/admin/posts" title="포스트 관리" />
    </div>
  </div>
);

export default MenuItems;
