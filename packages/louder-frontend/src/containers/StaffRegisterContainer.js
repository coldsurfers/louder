import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import * as adminActions from 'store/modules/admin';
import storage from 'lib/storage';
import { withRouter } from 'react-router-dom';
import StaffRegisterForm from 'components/admin/StaffRegisterForm/StaffRegisterForm';

class StaffRegisterContainer extends Component {

    initialize = () => {
        const { AdminActions } = this.props;
        AdminActions.initialize();
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
                        'Authorization': `Token ${token}`
                    }
                };
            };
            await BaseActions.checkLogged(config);

            if (!this.props.is_staff) {
                history.push("/");
            }
            BaseActions.setAuthChecked();

        } catch (e) {
            history.push("/");
        }
    }

    componentDidMount() {
        this.checkLogged();
        this.initialize();
    }

    changeInput = ({ name, value }) => {
        const { AdminActions } = this.props;
        AdminActions.changeInput({ name, value });
    }

    handleRegister = async () => {
        const { AdminActions, history } = this.props;
        const { username, password, email } = this.props.inputs.toJS();
        let config = null;
        let token = storage.get('token');

        if (token) {
            config = {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            };
        };
        try {
            await AdminActions.registerStaff({ username, password, email }, config);
            history.push("/");
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { changeInput, handleRegister } = this;
        const { username, password, email } = this.props.inputs.toJS();
        if(!this.props.adminChecked) return null;
        return (
            <StaffRegisterForm
                onChangeInput={changeInput}
                username={username}
                password={password}
                email={email}
                onRegister={handleRegister} />
        )
    }
}
export default connect(
    (state) => ({
        is_staff: state.base.get('is_staff'),
        inputs: state.admin.get('inputs'),
        adminChecked: state.base.get('adminChecked')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        AdminActions: bindActionCreators(adminActions, dispatch)
    })
)(withRouter(StaffRegisterContainer));