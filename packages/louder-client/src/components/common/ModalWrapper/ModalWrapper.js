import React from "react";
import classNames from "classnames/bind";
import styles from "./ModalWrapper.scss";

const cx = classNames.bind(styles);

const ModalWrapper = ({ children }) => (
  <div className={cx("modal-wrapper")}>{children}</div>
);

export default ModalWrapper;
