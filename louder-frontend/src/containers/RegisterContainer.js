import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import RegisterForm from 'components/auth/RegisterForm/RegisterForm';
import { withRouter } from 'react-router-dom';

class RegisterContainer extends Component {

    handleChangeInput = ({name, value}) => {
        const { AuthActions } = this.props;

        AuthActions.changeInput({name, value});
    }

    handleRegister = async () => {
        const { AuthActions, history } = this.props;
        const { username, email, password } = this.props.inputs.toJS();

        try {
            await AuthActions.register({username, email, password});
            history.push("/auth/login");
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
        const { username, email, password } = this.props.inputs.toJS();
        const { handleChangeInput, handleRegister } = this;
        return (
            <RegisterForm
                username={username}
                email={email}
                password={password}
                onChangeInput={handleChangeInput}
                onRegister={handleRegister}/>
        )
    }
}
export default connect(
    (state) => ({
        inputs: state.auth.get('inputs')
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(withRouter(RegisterContainer));