import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./AdminPageFooter.scss";

const cx = classNames.bind(styles);

const AdminPageFooter = () => (
  <div className={cx("footer")}>
    <Link to="/" className={cx("logo")}>
      Louder
    </Link>
  </div>
);

export default AdminPageFooter;
