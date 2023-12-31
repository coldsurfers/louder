import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from 'components/common/Header/Header';
import * as baseActions from 'store/modules/base';
import storage from 'lib/storage';
import { withRouter } from 'react-router-dom';

class HeaderContainer extends Component {
    handleLogout = async () => {
        const { BaseActions, history } = this.props;
        const token = storage.get('token');
        try {

            let config = null;

            if (token) {
                config = {
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Token ${token}`
                    }
                };
            };

            await BaseActions.logout(config);
            storage.remove('loggedInfo');
            storage.remove('token');
            window.location.href = "/";
        } catch (e) {
            console.log(e);
        }
    }



    render() {
        const { logged } = this.props;
        const { handleLogout } = this;
        return (
            <Header
                logged={logged}
                onLogout={handleLogout} />
        )
    }
}
export default connect(
    (state) => ({
        logged: state.base.get('logged')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(withRouter(HeaderContainer));