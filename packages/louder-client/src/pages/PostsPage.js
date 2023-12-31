import React from 'react';
import AdminPageTemplate from 'components/admin/AdminPageTemplate/AdminPageTemplate';
import AdminPostsContainer from 'containers/AdminPostsContainer';

const PostsPage = ({match}) => {
    const { page = 1 } = match.params;
    return (
        <AdminPageTemplate>
            <AdminPostsContainer page={page}/>
        </AdminPageTemplate>
    );
};

export default PostsPage;