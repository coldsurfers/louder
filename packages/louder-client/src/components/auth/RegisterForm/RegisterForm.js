import React from "react";
import classNames from "classnames/bind";
import Button from "components/common/Button";
import { Link } from "react-router-dom";
import styles from "./RegisterForm.scss";

const cx = classNames.bind(styles);

const RegisterForm = ({
  username,
  email,
  password,
  onChangeInput,
  onRegister,
}) => {
  const changeInput = (e) => {
    const { name, value } = e.target;
    onChangeInput({ name, value });
  };
  return (
    <div className={cx("LoginForm")}>
      <div className={cx("contents")}>
        <div className={cx("Line")}>
          <div className={cx("label")}>아이디</div>
          <div className={cx("input-wrapper")}>
            <input
              value={username}
              onChange={changeInput}
              type="text"
              name="username"
              className={cx("input")}
            />
          </div>
        </div>
        <div className={cx("Line")}>
          <div className={cx("label")}>비밀번호</div>
          <div className={cx("input-wrapper")}>
            <input
              value={password}
              onChange={changeInput}
              type="password"
              name="password"
              className={cx("input")}
            />
          </div>
        </div>
        <div className={cx("Line")}>
          <div className={cx("label")}>이메일</div>
          <div className={cx("input-wrapper")}>
            <input
              value={email}
              onChange={changeInput}
              type="email"
              name="email"
              className={cx("input")}
            />
          </div>
        </div>
        <div className={cx("button-wrapper")}>
          <Button onClick={onRegister}>Register</Button>
        </div>
        <div className={cx("desc")}>
          Already Registered?{" "}
          <Link className={cx("goto")} to="/auth/login">
            Go To Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
