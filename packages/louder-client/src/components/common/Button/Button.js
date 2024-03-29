import React from "react";
import classNames from "classnames/bind";
import styles from "./Button.scss";

const cx = classNames.bind(styles);

const Button = ({ children, onClick, theme }) => (
  <div className={cx("button", theme)} onClick={onClick}>
    {children}
  </div>
);

export default Button;
