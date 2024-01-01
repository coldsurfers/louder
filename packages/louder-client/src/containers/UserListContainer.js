import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as adminActions from 'store/modules/admin';
import * as baseActions from 'store/modules/base';
import storage from 'lib/storage';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import UserList from 'components/admin/UserList/UserList';
import Pagination from 'components/common/Pagination/Pagination';


class UserListContainer extends Component {

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

            if (!this.props.is_staff) {
                history.push("/");
            }
            BaseActions.setAuthChecked();

        } catch (e) {
            history.push("/");
        }
    }

    getUserList = async () => {
        const { AdminActions, location, page, what } = this.props;

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

        try {
            if(what === "Staff") {
                await AdminActions.getStaffList({ page }, config);
            }
            if(what === "member") {
                await AdminActions.getUserList({ page }, config);
            }

        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        console.log(this.props.page);
        this.checkLogged();
        if (this.props.is_staff) {

            this.getUserList();
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.is_staff !== this.props.is_staff) {
            this.getUserList();
        }

        if (prevProps.page !== this.props.page) {
            this.getUserList();
            document.documentElement.scrollTop = 0;
        }


    }

    deleteUser = async ({ id }) => {
        const { AdminActions, what } = this.props;
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
        try {
            if(what === "Staff") {
                await AdminActions.deleteStaff({ id }, config);
            }
            if(what === "member") {
                await AdminActions.deleteUser({ id }, config);
            }

            this.getUserList();
        } catch (e) {
            console.log(e);
        }
    }


    render() {
        const { userList, page } = this.props;
        const { deleteUser } = this;
        const { count, previous, next } = this.props.users.toJS();
        if (!this.props.adminChecked) return null;
        return (
            <Fragment>
                <UserList
                    list={userList}
                    deleteUser={deleteUser} />
                <Pagination what="userList" page={page} count={count} next={next} previous={previous} />
            </Fragment>
        )
    }
}
export default connect(
    (state) => ({
        is_staff: state.base.get('is_staff'),
        adminChecked: state.base.get('adminChecked'),
        userList: state.admin.get('userList'),
        users: state.admin.get('users'),
        next: state.admin.getIn(['users', 'next']),
        previous: state.admin.getIn(['users', 'previous'])
    }),
    (dispatch) => ({
        AdminActions: bindActionCreators(adminActions, dispatch),
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(withRouter(UserListContainer));