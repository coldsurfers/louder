import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "store/modules/base";
import storage from "lib/storage";
import UsersMenuItems from "components/admin/UsersMenuItems/UsersMenuItems";
import { withRouter } from "react-router-dom";

class UserMenuContainer extends Component {
  checkLogged = async () => {
    const { BaseActions, history } = this.props;

    try {
      let config = null;
      const token = storage.get("token");

      if (token) {
        config = {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      }
      await BaseActions.checkLogged(config);

      if (!this.props.is_staff) {
        history.push("/");
      }
      BaseActions.setAuthChecked();
    } catch (e) {
      history.push("/");
    }
  };

  componentDidMount() {
    this.checkLogged();
  }

  render() {
    return <UsersMenuItems />;
  }
}
export default connect(
  (state) => ({
    is_staff: state.base.get("is_staff"),
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  })
)(withRouter(UserMenuContainer));
