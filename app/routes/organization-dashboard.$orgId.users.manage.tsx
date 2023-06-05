import { useLoaderData } from "@remix-run/react";
import UsersPending from "~/components/tables/UsersPending";
import OrgUsers from "~/components/tables/OrgUsers";

import DashboardLayout from "~/layouts/Dashboardlayout";
import Breadcrumb from "~/components/Breadcrumb";

interface LoaderContext {
  request: Request;
  params: { orgId: string };
}


export async function loader({ request, params }: LoaderContext) {
  const response = await fetch(
    `http://localhost:3000/api/org/users/${params.orgId}`,
    {
      headers: {
        cookie: request.headers.get("cookie") || '', // Pass the cookies along with the request
      },
    }
  );
  const data = await response.json();
  return data;
}

function ManageUsers() {
//   const { users, joinRequests } = useLoaderData();
const data = useLoaderData();

return (
    <DashboardLayout>
        <Breadcrumb pageName="Manage Users" />
        {/* Conditionally render PendingInvites */}
        {data.joinRequests.length > 0 && <UsersPending joinRequests={data.joinRequests} />}
        <OrgUsers users={data.users} supervisors={data.supervisors} owner={data.owner}/>
    </DashboardLayout>
)
}

export default ManageUsers;
