import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./SettingMenu.scss";

const cx = classNames.bind(styles);

const SettingMenu = ({ visible, id, onRemove }) => {
  if (!visible) return null;

  return (
    <div className={cx("wrapper")}>
      <div className={cx("contents")}>
        <div className={cx("line")}>
          <Link to={`/admin/editor?id=${id}`} className={cx("text")}>
            수정하기
          </Link>
        </div>
        <div className={cx("line")}>
          <div className={cx("text")} onClick={onRemove}>
            삭제하기
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingMenu;
