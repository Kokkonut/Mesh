import React from 'react';
import { useLoaderData, Link } from '@remix-run/react';
import DashboardLayout from '~/layouts/Dashboardlayout';
import Breadcrumb from '~/components/Breadcrumb';

interface LoaderContext {
  request: Request;
  params: { orgId: string };
}

export async function loader({ request, params }: LoaderContext) {
  console.log('params', params.orgId);
  const response = await fetch(
    `http://localhost:3000/api/org/${params.orgId}`,
    {
      headers: {
        cookie: request.headers.get('cookie') || '', 
      },
    }
  );
  const data = await response.json();
  console.log('data', data);
  return data;
}

const OrganizationDashboard: React.FC = () => {
  const data = useLoaderData();
  let orgId = data.orgData._id;

  return (
    <DashboardLayout>
      <Breadcrumb pageName={data.orgData.name} />
      
      <div className="flex flex-wrap justify-around">
        {data.orgData.projects &&
          data.orgData.projects
            .filter((proj: any) => proj.project)
            .map((proj: any) => (
              <Link key={proj.project._id} to={`/organization-dashboard/${orgId}/projects/${proj.project._id}`}>
                <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 cursor-pointer hover:shadow-xl transition-shadow duration-200 flex items-center justify-center">
                  <div className="px-6 py-4 text-center">
                    <div className="font-bold text-xl mb-2">{proj.project.name}</div>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </DashboardLayout>
  );
};

export default OrganizationDashboard;
