import React from "react";
import classNames from "classnames/bind";
import UserItem from "components/admin/UserItem/UserItem";
import styles from "./UserList.scss";

const cx = classNames.bind(styles);

const UserList = ({ list, deleteUser }) => {
  const onDelete = ({ id }) => {
    deleteUser({ id });
  };

  const userList = list.map((user, i) => (
    <UserItem
      key={user.get("id")}
      id={user.get("id")}
      username={user.get("username")}
      email={user.get("email")}
      onDelete={onDelete}
    />
  ));

  return <div className={cx("UserList")}>{userList}</div>;
};

export default UserList;
