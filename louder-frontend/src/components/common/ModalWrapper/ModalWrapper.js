import React from 'react';
import styles from './ModalWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ModalWrapper = ({children}) => (
  <div className={cx('modal-wrapper')}>
    {children}
  </div>
);

export default ModalWrapper;