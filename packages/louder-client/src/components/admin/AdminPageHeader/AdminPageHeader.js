import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./AdminPageHeader.scss";

const cx = classNames.bind(styles);

const AdminPageHeader = () => (
  <div className={cx("header")}>
    <div className={cx("contents")}>
      <Link to="/admin/home" className={cx("logo")}>
        Louder Admin Page
      </Link>
    </div>
  </div>
);

export default AdminPageHeader;
