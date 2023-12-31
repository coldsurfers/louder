import React from 'react';
import AdminPageTemplate from 'components/admin/AdminPageTemplate/AdminPageTemplate';
import PostContainer from 'containers/PostContainer';

const AdminPostDetailPage = ({match}) => {
    const { id } = match.params;
    return (
        <AdminPageTemplate>
            <PostContainer id={id}/>
        </AdminPageTemplate>
    );
};

export default AdminPostDetailPage;