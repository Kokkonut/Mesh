import React from 'react';
import { useParams } from '@remix-run/react';
import DashboardLayout from '~/layouts/Dashboardlayout';
import Breadcrumb from '~/components/Breadcrumb';

const ProjectDetails = () => {
  const { orgId, projectId } = useParams();

  return (
    <DashboardLayout>
      <Breadcrumb pageName='Project Details' />
    <div>
      <p>Organization ID: {orgId}</p>
      <p>Project ID: {projectId}</p>
    </div>
    </DashboardLayout>
  );
};

export default ProjectDetails;
