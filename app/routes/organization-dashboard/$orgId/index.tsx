import React, { useEffect } from 'react';
import { useLoaderData, useNavigate } from '@remix-run/react';
import DashboardLayout from '~/layouts/Dashboardlayout';
// import { json } from '@remix-run/react';
import { LoaderFunction, redirect } from '@remix-run/node';

export let loader: LoaderFunction = async ({ request, params }) => {
  const response = await fetch(`http://localhost:3000/api/org/${params.orgId}`, {
    headers: {
      cookie: request.headers.get('cookie') || '', // use empty string if the cookie is null
    },
  });
      
      // if (response.status === 401) { return json ({ redirect: '/login' }, { status: 401 }); }

  if (response.status === 401) {
    // redirect('/login', { headers: { 'Set-Cookie': 'redirected=true' } });
    throw new Error('Unauthorized');
  } else if (!response.ok) {
    console.error('Error fetching organization data:', response.status, response.statusText);
    throw new Error('Error fetching organization data');
  }

  const orgData = await response.json();
  return orgData;
}

const OrganizationDashboard: React.FC = () => {
  const dataOrError = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (dataOrError instanceof Error && dataOrError.message === ('Unauthorized' || 'Error fetching organization data')) {
      console.log ('Unauthorized');
      navigate("/login");
    }
  }, [dataOrError, navigate]);

  if (dataOrError instanceof Error) {
    // if it's an error, stop rendering
    return null;
  }

  if (!dataOrError) {
    // If data is not loaded yet, you can render a loading indicator
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      {/* Add your organization dashboard content here */}
      <h1>Welcome to {dataOrError.name} Dashboard</h1>
      <p>Organization dashboard content goes here.</p>
    </DashboardLayout>
  );
};

export default OrganizationDashboard;
