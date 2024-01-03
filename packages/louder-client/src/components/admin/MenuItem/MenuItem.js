import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./MenuItem.scss";

const cx = classNames.bind(styles);

const MenuItem = ({ to, title }) => (
  <div className={cx("MenuItem")}>
    <div className={cx("Contents")}>
      <Link to={to} className={cx("title")}>
        {title}
      </Link>
    </div>
  </div>
);

export default MenuItem;
