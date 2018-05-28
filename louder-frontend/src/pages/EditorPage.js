import React from 'react';
import AdminPageTemplate from 'components/admin/AdminPageTemplate/AdminPageTemplate';
import AdminEditorContainer from 'containers/AdminEditorContainer';

const EditorPage = () => {

    return (
        <AdminPageTemplate>
            <AdminEditorContainer/>
        </AdminPageTemplate>
    );
};

export default EditorPage;