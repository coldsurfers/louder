import React from 'react';
import PageTemplate from 'components/common/PageTemplate/PageTemplate';
import ListContainer from 'containers/ListContainer';

const ListPage = ({match}) => {
    const { page = 1 } = match.params;
    return (
        <PageTemplate>
            <ListContainer page={page}/>
        </PageTemplate>
    );
};

export default ListPage;