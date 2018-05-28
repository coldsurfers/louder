import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import storage from 'lib/storage';
import MenuItems from 'components/admin/MenuItems/MenuItems';
import { withRouter } from 'react-router-dom';


class MenuItemsContainer extends Component {

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
            
            if(!this.props.is_staff) {
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

    render() {
        const { adminChecked } = this.props;
        if(!adminChecked) return null;
        return (
            <MenuItems/>
        )
    }
}
export default connect(
    (state) => ({
        adminChecked: state.base.get('adminChecked'),
        is_staff: state.base.get('is_staff')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(withRouter(MenuItemsContainer));