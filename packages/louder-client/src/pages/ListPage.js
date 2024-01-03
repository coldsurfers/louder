import React from "react";
import PageTemplate from "components/common/PageTemplate/PageTemplate";
import ListContainer from "containers/ListContainer";
import qs from "query-string";

const ListPage = (props) => {
  const queryParams = qs.parse(props.location.search);
  const page = isNaN(+queryParams.page) ? 1 : +queryParams.page;
  return (
    <PageTemplate>
      <ListContainer page={page} />
    </PageTemplate>
  );
};

export default ListPage;
