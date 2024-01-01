import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';
import InfoForm from 'components/auth/InfoForm/InfoForm';
import storage from 'lib/storage';
import { withRouter } from 'react-router-dom';

class InfoFormContainer extends Component {
    showModal = () => {
        const { BaseActions } = this.props;
        BaseActions.showModal();
    }

    showPasswordChanging = () => {
        const { BaseActions } = this.props;
        BaseActions.showPasswordChanging();
    }

    hidePasswordChanging = () => {
        const { BaseActions, AuthActions } = this.props;
        AuthActions.initialize();
        BaseActions.hidePasswordChanging();
    }

    changeEmail = async () => {
        const { BaseActions } = this.props;

        try {
            await BaseActions.changeEmail();
        } catch (e) {
            console.log(e);
        }
    }

    checkLogged = async () => {
        const { BaseActions, history } = this.props;

        try {
            let config = null;
            let token = storage.get('token');

            if (token) {
                config = {
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                };
            };
            await BaseActions.checkLogged(config);

            if (this.props.is_staff) {
                history.push("/");
            }
            BaseActions.setAuthChecked();

        } catch (e) {
            history.push("/");
        }
    }


    componentDidMount() {
        this.checkLogged();

    }

    handleChangeInput = ({ name, value }) => {
        const { AuthActions } = this.props;
        AuthActions.changeInput({ name, value });
    }

    changePassword = async () => {
        const { BaseActions } = this.props;
        const { password, passwordCheck } = this.props.inputs.toJS();
        const token = storage.get('token');
        let config = null;
        if (token) {
            config = {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };
        };
        try {
            await BaseActions.changePassword({ category: "password", password, passwordCheck }, config);
            this.hidePasswordChanging();
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { username, email, passwordChanging, inputs } = this.props;
        const { showModal,
                showPasswordChanging,
                hidePasswordChanging,
                handleChangeInput,
                changePassword } = this;

        if (this.props.is_staff) return null;
        return (
            <InfoForm
                username={username}
                email={email}
                passwordVisible={passwordChanging}
                showModal={showModal}
                onShowPassword={showPasswordChanging}
                onHidePassword={hidePasswordChanging}
                onChangeInput={handleChangeInput}
                onChangePassword={changePassword}
                inputs={inputs} />
        )
    }
}
export default connect(
    (state) => ({
        username: state.base.get('username'),
        email: state.base.get('email'),
        is_staff: state.base.get('is_staff'),
        passwordChanging: state.base.getIn(['visible', 'passwordChanging']),
        inputs: state.auth.get('inputs')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(withRouter(InfoFormContainer));