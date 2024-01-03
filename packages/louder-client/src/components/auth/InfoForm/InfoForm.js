import React from "react";
import classNames from "classnames/bind";
import Button from "components/common/Button/Button";
import styles from "./InfoForm.scss";

const cx = classNames.bind(styles);

const InfoForm = ({
  username,
  email,
  showModal,
  onShowPassword,
  onHidePassword,
  passwordVisible,
  onChangeInput,
  inputs,
  onChangePassword,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChangeInput({ name, value });
  };

  return (
    <div className={cx("InfoForm")}>
      <div className={cx("contents")}>
        <div className={cx("Line")}>
          <div className={cx("description")}>아이디</div>
          <div className={cx("text")}>{username}</div>
        </div>
        <div className={cx("Line")}>
          <div
            className={cx("button-wrapper")}
            style={{ display: passwordVisible ? "none" : "block" }}
          >
            <Button onClick={onShowPassword}>비밀번호 변경하기</Button>
          </div>
        </div>
        <div
          className={cx("Line")}
          style={{ display: passwordVisible ? "block" : "none" }}
        >
          <div className={cx("description")}>
            변경할 비밀번호를 입력해주세요.
          </div>
          <div className={cx("input-wrapper")}>
            <div className={cx("One")}>
              <input
                type="password"
                name="password"
                value={inputs.toJS().password}
                onChange={handleChange}
                className={cx("input")}
                placeholder="비밀번호 입력"
              />
            </div>
            <div className={cx("One")}>
              <input
                type="password"
                name="passwordCheck"
                value={inputs.toJS().passwordCheck}
                onChange={handleChange}
                className={cx("input")}
                placeholder="비밀번호 확인 입력"
              />
            </div>
          </div>
          <div className={cx("button-wrapper")}>
            <div className={cx("Button")}>
              <Button onClick={onChangePassword}>변경하기</Button>
            </div>
            <div className={cx("Button")}>
              <Button theme="cancel" onClick={onHidePassword}>
                취소하기
              </Button>
            </div>
          </div>
        </div>
        <div className={cx("Line")}>
          <div className={cx("description")}>이메일</div>
          <div className={cx("text")}>{email}</div>
          <div className={cx("button-wrapper-email")}>
            <Button onClick={showModal}>이메일 변경하기</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoForm;
