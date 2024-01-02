import React from "react";
import PageTemplate from "components/common/PageTemplate/PageTemplate";
import PostDetailContainer from "containers/PostDetailContainer";

const PostDetailPage = ({ match }) => {
  const { id } = match.params;
  return (
    <PageTemplate>
      <PostDetailContainer id={id} />
    </PageTemplate>
  );
};

export default PostDetailPage;
