import { Form, useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import DashboardLayout from "~/layouts/Dashboardlayout";
import Breadcrumb from "~/components/Breadcrumb";
import { formDataToObject } from "~/helpers/utilities";

interface LoaderContext {
    request: Request;
    params: { userId: string, orgId: string };
}

export async function loader({ request, params }: LoaderContext) {
    console.log(' FONT END User detail params', params.orgId, params.userId);
    const response = await fetch(
        `http://localhost:3000/api/user/${params.orgId}/${params.userId}`,
        {
            headers: {
                cookie: request.headers.get('cookie') || '',
            },
            }
    );
    const data = await response.json();
    console.log('user detaail data', data);
    return data;
}

export let action: ActionFunction = async ({ request, params }) => {
    console.log('ACTION FUNCTION request', request);
    console.log('ACTION FUNCTION params', params);
    let formData = await request.formData();
    let data = formDataToObject(formData);

    let response = await fetch(
        `http://localhost:3000/api/user/${params.orgId}/${params.userId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                cookie: request.headers.get("cookie") || "",
            },
            body: JSON.stringify(data),
        }
    );

    if (response.ok) {
        return redirect(`/organization-dashboard/${params.orgId}/users/manage`);
    } else {
        // Handle any errors
        return new Response(null, { status: 500 });
    }
};

const UserDetail = () => {
    let user= useLoaderData();
    const fullName = user.firstName + " " + user.lastName;
    
  return (
    <DashboardLayout>
      <Breadcrumb pageName="User Details" />

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Personal Information
              </h3>
            </div>
            <div className="p-7">
              <Form method='put'>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Devid Jhon"
                        defaultValue={fullName}
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="title"
                    >
                      Title
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Please add title"
                      defaultValue={user.organization?.title || ""}

                    />
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                        name="email"
                        id="email"
                        placeholder="Big@boss.com"
                        defaultValue={user.email}
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="hours"
                    >
                      Hours Per Week
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="number"
                      name="fte"
                      id="fte"
                      placeholder="Please add hours per week"
                      defaultValue={user.organization?.fte || ""}
                    />
                  </div>
                </div>



                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="submit"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDetail;
