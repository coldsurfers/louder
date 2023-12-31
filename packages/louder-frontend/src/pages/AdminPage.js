import React from 'react';
import AdminPageTemplate from 'components/admin/AdminPageTemplate/AdminPageTemplate';
import MenuItemsContainer from 'containers/MenuItemsContainer';

const AdminPage = () => {
    return (
        <AdminPageTemplate>
            <MenuItemsContainer/>
        </AdminPageTemplate>
    );
};

export default AdminPage;