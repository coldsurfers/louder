import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Button from "components/common/Button";
import styles from "./Header.scss";

const cx = classNames.bind(styles);

const Header = ({ logged, onLogout }) => (
  <div className={cx("header")}>
    <div className={cx("contents")}>
      <Link to="/" className={cx("logo")}>
        Louder
      </Link>
      <div className={cx("right")}>
        {logged ? (
          [
            <Link to="/auth/info" key="info" className={cx("menu")}>
              내 정보
            </Link>,
            <Button
              onClick={onLogout}
              key="logout"
              theme="right"
              className={cx("menu")}
            >
              로그아웃
            </Button>,
          ]
        ) : (
          <Link to="/auth/login" className={cx("menu")}>
            Login / Register
          </Link>
        )}
      </div>
    </div>
  </div>
);

export default Header;
