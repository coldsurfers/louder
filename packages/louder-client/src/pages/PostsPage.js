import React from "react";
import AdminPageTemplate from "components/admin/AdminPageTemplate/AdminPageTemplate";
import AdminPostsContainer from "containers/AdminPostsContainer";
import qs from "query-string";

const PostsPage = (props) => {
  const queryParams = qs.parse(props.location.search);
  const page = isNaN(+queryParams.page) ? 1 : +queryParams.page;
  return (
    <AdminPageTemplate>
      <AdminPostsContainer page={page} />
    </AdminPageTemplate>
  );
};

export default PostsPage;
