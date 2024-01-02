import React from "react";
import classNames from "classnames/bind";
import Button from "components/common/Button/Button";
import styles from "./UserItem.scss";

const cx = classNames.bind(styles);

const UserItem = ({ id, email, username, onDelete }) => {
  const handleDelete = () => {
    onDelete({ id });
  };
  return (
    <div className={cx("UserItem")}>
      <div className={cx("contents")}>
        <div className={cx("left")}>
          <div className={cx("Line")}>
            <div className={cx("label")}>아이디</div>
            <div className={cx("text")}>{username}</div>
          </div>
          <div className={cx("Line")}>
            <div className={cx("label")}>이메일</div>
            <div className={cx("text")}>{email}</div>
          </div>
        </div>
        <div className={cx("right")}>
          <div className={cx("button-wrapper")}>
            <Button theme="remove" onClick={handleDelete}>
              삭제
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserItem;
