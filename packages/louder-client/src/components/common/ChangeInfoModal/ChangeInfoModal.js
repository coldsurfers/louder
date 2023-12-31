import React from 'react';
import styles from './ChangeInfoModal.scss';
import classNames from 'classnames/bind';
import Button from '../Button/Button';

const cx = classNames.bind(styles);

const ChangeInfoModal = ({visible, email, onChangeInput, onChangeEmail}) => {
  if(!visible) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChangeInput({name, value});
  }

  return (
    <div className={cx('modal')}>
      <div className={cx('contents')}>
        <div className={cx('desc')}>
          바꿀 이메일을 입력하세요
        </div>
        <div className={cx('input-wrapper')}>
          <input type="email" onChange={handleChange} value={email} name="email" className={cx('input')} />
        </div>
        <div className={cx('button-wrapper')}>
        <Button onClick={onChangeEmail}>이메일 변경</Button>
        </div>
      </div>
    </div>
  );
}

export default ChangeInfoModal;