import { Form, Outlet } from "@remix-run/react";
import {
  json,
  LoaderFunction,
  ActionFunction,
  redirect,
} from "@remix-run/node";
import { formDataToObject } from "~/helpers/utilities";

export let action: ActionFunction = async ({ request, params }) => {
  let formData = await request.formData();
  let data = formDataToObject(formData);
  const { orgId, projectId } = params;

  let response = await fetch(
    `http://localhost:3000/api/task/${orgId}/${projectId}/createTask`,
    {
      method: "POST",
      headers: {
        cookie: request.headers.get("cookie") || "", // use empty string if the cookie is null
        "Content-Type": "application/json",
        "cache-control": "no-cache",
      },
      body: JSON.stringify(data),
    }
  );

  if (response.ok) {
    return redirect(
      `/tasks/${orgId}/${projectId}/taskManager/AddTask/getAll/tasks`
    );
  } else {
    // Handle any errors
    return new Response(null, { status: 500 });
  }
};

function AddTask() {
  return (
<>
  <div className="rounded-sm border py-4 px-4 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark justify-between">
    <Form method="post" encType="multipart/form-data" className="space y-4 align-center">
      <span className="flex align-center">
      <label className="mb-3 block text-black dark:text-white">
        Task Name:
        <input 
          type="text" 
          name="name" 
          required 
          className="w-80 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          placeholder="Task to add to project"
        />
      </label>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md border border-primary m-2 py-1 px-2.5 text-center font-medium text-primary hover:bg-opacity-90"
      >
        Create Task
      </button>
      </span>
    </Form>
  </div>
  <Outlet />
</>

  );
}

export default AddTask;
