import React from 'react';
import AdminPageTemplate from 'components/admin/AdminPageTemplate/AdminPageTemplate';
import UserMenuContainer from 'containers/UserMenuContainer';


const UsersPage = () => {
    return (
        <AdminPageTemplate>
            <UserMenuContainer/>
        </AdminPageTemplate>
    );
};

export default UsersPage;