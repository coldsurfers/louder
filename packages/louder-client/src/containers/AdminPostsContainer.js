import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as adminActions from 'store/modules/admin';
import * as baseActions from 'store/modules/base';
import PostList from 'components/admin/PostList/PostList';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import storage from 'lib/storage';
import Pagination from 'components/common/Pagination/Pagination';


class AdminPostsContainer extends Component {
    getPostList = async () => {
        const { AdminActions, location, page } = this.props;
        // const { page = 1 } = queryString.parse(location.search);
        let token = storage.get('token');
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
            await AdminActions.getPostList({ page }, config);
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

            if (!this.props.is_staff) {
                history.push("/");
            }
            BaseActions.setAuthChecked();

        } catch (e) {
            history.push("/");
        }
    }

    componentDidMount() {
        console.log(this.props.location.pathname);
        this.checkLogged();
        this.getPostList();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.page !== this.props.page) {
            this.getPostList();
        }
    }
    render() {
        const { results, adminChecked, page, next, previous, count } = this.props;
        if (!adminChecked) return null;
        return (
            <Fragment>
                <PostList
                    posts={results} />
                <Pagination what="adminPosts" page={page} next={next} previous={previous} count={count}/>
            </Fragment>
        )
    }
}
export default connect(
    (state) => ({
        results: state.admin.getIn(['posts', 'results']),
        adminChecked: state.base.get('adminChecked'),
        is_staff: state.base.get('is_staff'),
        next: state.admin.getIn(['posts', 'next']),
        previous: state.admin.getIn(['posts', 'previous']),
        count: state.admin.getIn(['posts', 'count'])
    }),
    (dispatch) => ({
        AdminActions: bindActionCreators(adminActions, dispatch),
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(withRouter(AdminPostsContainer));