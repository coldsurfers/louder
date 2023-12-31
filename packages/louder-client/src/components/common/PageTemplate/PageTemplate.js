import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';
import Footer from 'components/common/Footer/Footer';
import HeaderContainer from 'containers/HeaderContainer';

const cx = classNames.bind(styles);

const PageTemplate = ({ children }) => (
  <div className={cx('page-template')}>
    <HeaderContainer />
    <main>
      {children}
    </main>
    <Footer />
  </div>
);

export default PageTemplate;