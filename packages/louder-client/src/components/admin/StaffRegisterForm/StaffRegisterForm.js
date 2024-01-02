import React from "react";
import classNames from "classnames/bind";
import Button from "components/common/Button/Button";
import styles from "./StaffRegisterForm.scss";

const cx = classNames.bind(styles);

const StaffRegisterForm = ({
  onChangeInput,
  username,
  email,
  password,
  onRegister,
}) => {
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    onChangeInput({ name, value });
  };

  return (
    <div className={cx("form")}>
      <div className={cx("contents")}>
        <div className={cx("Line")}>
          <div className={cx("label")}>아이디</div>
          <div className={cx("input-wrapper")}>
            <input
              type="text"
              name="username"
              className={cx("input")}
              value={username}
              onChange={handleChangeInput}
            />
          </div>
        </div>
        <div className={cx("Line")}>
          <div className={cx("label")}>패스워드</div>
          <div className={cx("input-wrapper")}>
            <input
              type="password"
              name="password"
              className={cx("input")}
              value={password}
              onChange={handleChangeInput}
            />
          </div>
        </div>
        <div className={cx("Line")}>
          <div className={cx("label")}>이메일</div>
          <div className={cx("input-wrapper")}>
            <input
              type="email"
              name="email"
              className={cx("input")}
              value={email}
              onChange={handleChangeInput}
            />
          </div>
        </div>
        <div className={cx("button-wrapper")}>
          <Button theme="StaffRegister" onClick={onRegister}>
            등록하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StaffRegisterForm;
