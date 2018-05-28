import React from 'react';
import styles from './EditorPageTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const EditorPageTemplate = ({children}) => (
  <div className={cx('template')}>
    <div className={cx('template-view')}>
      {children}
    </div>
  </div>
);

export default EditorPageTemplate;