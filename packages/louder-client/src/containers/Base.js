import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import storage from 'lib/storage';


class Base extends Component {
    checkLogged = async () => {
        const loggedInfo = storage.get('loggedInfo');
        if (!loggedInfo) return;

        const { BaseActions } = this.props;
        BaseActions.tempLogin();

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
            await BaseActions.checkLogged(config);
        } catch (e) {
            storage.remove('loggedInfo');
            storage.remove('token');
            window.location.href = "/auth/login?expired";
        }
    }

    componentDidMount() {
        this.checkLogged();
    }
    render() {
        return (
            <div>
            </div>
        )
    }
}
export default connect(
    (state) => ({
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(Base);