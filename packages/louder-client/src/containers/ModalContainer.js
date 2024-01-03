import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "store/modules/base";
import * as authActions from "store/modules/auth";
import ModalWrapper from "components/common/ModalWrapper/ModalWrapper";
import ChangeInfoModal from "components/common/ChangeInfoModal/ChangeInfoModal";
import onClickOutside from "react-onclickoutside";
import storage from "lib/storage";

class ModalContainer extends Component {
  handleClickOutside = () => {
    const { BaseActions, AuthActions } = this.props;
    AuthActions.initialize();
    BaseActions.hideModal();
  };

  handleChangeInput = ({ name, value }) => {
    const { AuthActions } = this.props;
    AuthActions.changeInput({ name, value });
  };

  changeEmail = async () => {
    const { BaseActions, AuthActions } = this.props;
    const { email } = this.props.inputs.toJS();

    try {
      const token = storage.get("token");

      let config = null;

      if (token) {
        config = {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      }

      await BaseActions.changeEmail({ category: "email", email }, config);
      AuthActions.initialize();
      BaseActions.hideModal();
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { visible } = this.props;
    const { handleChangeInput, changeEmail } = this;
    const { email } = this.props.inputs.toJS();
    return (
      <ChangeInfoModal
        visible={visible}
        email={email}
        onChangeInput={handleChangeInput}
        onChangeEmail={changeEmail}
      />
    );
  }
}
export default connect(
  (state) => ({
    visible: state.base.getIn(["visible", "modal"]),
    inputs: state.auth.get("inputs"),
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch),
  })
)(onClickOutside(ModalContainer));
