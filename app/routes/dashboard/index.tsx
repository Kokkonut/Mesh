import React, { useEffect } from "react";
import DashboardLayout from "~/layouts/Dashboardlayout";
import { Link, useLoaderData } from "@remix-run/react";
import OrganizationCard from "~/components/OrganizationCard";
import { useSetUserData } from "~/context/UserDataContext";
import type { LoaderFunction } from "@remix-run/node";

export let loader: LoaderFunction = async ({ request }) => {
  const cookie = request.headers.get("cookie");


  const response = await fetch("http://localhost:3000/api/user/data", {
    headers: {
      cookie: cookie, // Pass the cookies along with the request
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data;
};

const Dashboard: React.FC = () => {
  const data = useLoaderData();
  const setUserData = useSetUserData();

  useEffect(() => {
    setUserData(data);
  }, [data, setUserData]);

  const { organizations } = data;

  return (
    <DashboardLayout>
      {organizations && organizations.length === 0 ? (
        <div>
          <h2>
            Welcome! Please <Link to="#">create</Link> or join an organization.
          </h2>
        </div>
      ) : (
        <div>
          <div>
            {organizations?.map(
              ({ org: { _id, name, description } }: any, index: number) => (
                <OrganizationCard
                  key={index}
                  id={_id}
                  name={name}
                  description={description}
                />
              )
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
