import React from "react";
import classNames from "classnames/bind";
import styles from "./EditorPageTemplate.scss";

const cx = classNames.bind(styles);

const EditorPageTemplate = ({ children }) => (
  <div className={cx("template")}>
    <div className={cx("template-view")}>{children}</div>
  </div>
);

export default EditorPageTemplate;
