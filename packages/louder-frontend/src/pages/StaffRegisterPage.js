import React from 'react';
import AdminPageTemplate from 'components/admin/AdminPageTemplate/AdminPageTemplate';
import StaffRegisterContainer from 'containers/StaffRegisterContainer';


const StaffRegisterPage = () => {
    return (
        <AdminPageTemplate>
            <StaffRegisterContainer/>
        </AdminPageTemplate>
    );
};

export default StaffRegisterPage;