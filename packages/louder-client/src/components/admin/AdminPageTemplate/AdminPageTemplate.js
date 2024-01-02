import React from "react";
import classNames from "classnames/bind";
import AdminPageHeader from "components/admin/AdminPageHeader/AdminPageHeader";
import AdminPageFooter from "components/admin/AdminPageFooter/AdminPageFooter";
import styles from "./AdminPageTemplate.scss";

const cx = classNames.bind(styles);

const AdminPageTemplate = ({ children }) => (
  <div className={cx("template")}>
    <AdminPageHeader />
    <main>{children}</main>
    <AdminPageFooter />
  </div>
);

export default AdminPageTemplate;
