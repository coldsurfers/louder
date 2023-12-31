import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listActions from 'store/modules/list';
import PostList from 'components/list/PostList/PostList';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import Pagination from '../components/common/Pagination/Pagination';

class ListContainer extends Component {

    getPostList = async () => {
        const { ListActions, location, page } = this.props;
        console.log(page);
        // const { page = 1 } = queryString.parse(location.search);
        try {
            await ListActions.getPostList({ page });
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.getPostList();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.page !== this.props.page) {
            this.getPostList();
        }
    }

    render() {
        const { postList, page, next, previous, count } = this.props;
        return (
            <Fragment>
                <PostList
                    posts={postList}
                />
                <Pagination
                    next={next}
                    previous={previous}
                    count={count}
                    page={page}
                    what="homeList" />
            </Fragment>
        )
    }
}
export default connect(
    (state) => ({
        postList: state.list.get('postList'),
        next: state.list.get('nextPage'),
        previous: state.list.get('prevPage'),
        count: state.list.get('count')
    }),
    (dispatch) => ({
        ListActions: bindActionCreators(listActions, dispatch)
    })
)(withRouter(ListContainer));