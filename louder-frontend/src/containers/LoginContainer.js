import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import * as baseActions from 'store/modules/base';
import LoginForm from 'components/auth/LoginForm/LoginForm';
import { withRouter } from 'react-router-dom';

class LoginContainer extends Component {

    handleChangeInput = ({name, value}) => {
        const { AuthActions } = this.props;

        AuthActions.changeInput({name, value});
    }

    handleLogin = async () => {
        const { history, BaseActions } = this.props;
        const { username, password } = this.props.inputs.toJS();

        try {
            await BaseActions.login({username, password});
            history.push("/");
        } catch(e) {
            console.log(e);
        }
    }


    initialize = () => {
        const { AuthActions } = this.props;
        AuthActions.initialize();
    }

    componentDidMount() {
        this.initialize();
    }

    render() {
        const { username, password } = this.props.inputs.toJS();
        const { handleChangeInput, handleLogin } = this;
        return (
            <LoginForm
                onChangeInput={handleChangeInput}
                onLogin={handleLogin}
                username={username}
                password={password}/>
        )
    }
}
export default connect(
    (state) => ({
        inputs: state.auth.get('inputs')
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(withRouter(LoginContainer));