import React from "react";
import PageTemplate from "components/common/PageTemplate/PageTemplate";
import InfoFormContainer from "containers/InfoFormContainer";
import ModalContainer from "containers/ModalContainer";

const InfoPage = () => (
  <PageTemplate>
    <InfoFormContainer />
    <ModalContainer />
  </PageTemplate>
);

export default InfoPage;
