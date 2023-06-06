import React, { useState } from 'react';
import { Form, useLocation } from '@remix-run/react';
import { useParams } from '@remix-run/react';
import DashboardLayout from '~/layouts/Dashboardlayout';
import Breadcrumb from '~/components/Breadcrumb';

function CreateProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const location = useLocation();
  const { pathname } = location;
  const organizationId = pathname.split("/")[2];

  async function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();

    const response = await fetch(`/api/project/createProject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, startDate, endDate, organizationId }),
    });

    if (response.ok) {
      // Redirect or show a success message
      console.log('Successfully created project');
    } else {
      // Show an error message
      console.error('Failed to create project');
    }
  }

  return (
    <DashboardLayout>
      <Breadcrumb pageName="Create Project" />

      <div className="rounded-sm border py-4 px-4 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <Form method="post" onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label htmlFor="name" className="mb-3 block text-black dark:text-white">
                Project Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description" className="mb-3 block text-black dark:text-white">
                Project Description
              </label>
              <input
                id="description"
                name="description"
                type="text"
                value={description}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="startDate" className="mb-3 block text-black dark:text-white">
                Start Date
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                value={startDate}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                onChange={e => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="endDate" className="mb-3 block text-black dark:text-white">
                End Date
              </label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                value={endDate}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                onChange={e => setEndDate(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                Create Project
              </button>
            </div>
          </div>
        </Form>
      </div>
    </DashboardLayout>
  );
}

export default CreateProject;
