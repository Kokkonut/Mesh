import { useLoaderData } from "@remix-run/react";
import DashboardLayout from "~/layouts/Dashboardlayout";
import Breadcrumb from "~/components/Breadcrumb";
import OrgProjects from "~/components/tables/OrgProjects";

interface LoaderContext {
    request: Request;
    params: { orgId: string };
}
//get projects for org
export async function loader({ request, params }: LoaderContext) {
  const response = await fetch(
    `http://localhost:3000/api/project/${params.orgId}`,
    {
      headers: {
        cookie: request.headers.get('cookie') || '', 
      },
    }
  );
  const data = await response.json();
  return data;
}

function ManageProjects() {
  const data = useLoaderData();


  return (
    <DashboardLayout>
      <Breadcrumb pageName="Manage Projects" />
      <OrgProjects projects={data} />
    </DashboardLayout>
  )
}

export default ManageProjects;
