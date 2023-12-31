import React from 'react';
import AdminPageTemplate from 'components/admin/AdminPageTemplate/AdminPageTemplate';
import UserListContainer from 'containers/UserListContainer';

const UserListPage = ({match}) => {
    const { page = 1 } = match.params;
    return (
        <AdminPageTemplate>
            <UserListContainer what="member" page={page}/>
        </AdminPageTemplate>
    );
};

export default UserListPage;