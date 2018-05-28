import React from 'react';
import AdminPageTemplate from 'components/admin/AdminPageTemplate/AdminPageTemplate';
import UserListContainer from 'containers/UserListContainer';


const StaffManagePage = ({match}) => {
    const { page = 1 } = match.params;
    return (
        <AdminPageTemplate>
            <UserListContainer what="Staff" page={page}/>
        </AdminPageTemplate>
    );
};

export default StaffManagePage;