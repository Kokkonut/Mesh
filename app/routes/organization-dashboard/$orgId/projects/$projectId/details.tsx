import React from 'react';
import { useParams } from '@remix-run/react';
import DashboardLayout from '~/layouts/Dashboardlayout';

const ProjectDetails = () => {
  const { orgId, projectId } = useParams();

  return (
    <DashboardLayout>
    <div>
      <h2>Project Details</h2>
      <p>Organization ID: {orgId}</p>
      <p>Project ID: {projectId}</p>
    </div>
    </DashboardLayout>
  );
};

export default ProjectDetails;
