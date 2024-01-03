import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "store/modules/base";
import SettingMenu from "components/common/SettingMenu/SettingMenu";
import onClickOutside from "react-onclickoutside";

class SettingMenuContainer extends Component {
  handleClickOutside = () => {
    const { BaseActions } = this.props;
    BaseActions.toggleSettingMenu();
  };

  render() {
    const { visible, id, onRemovePost } = this.props;
    return <SettingMenu id={id} visible={visible} onRemove={onRemovePost} />;
  }
}
export default connect(
  (state) => ({
    visible: state.base.getIn(["visible", "settingMenu"]),
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  })
)(onClickOutside(SettingMenuContainer));
