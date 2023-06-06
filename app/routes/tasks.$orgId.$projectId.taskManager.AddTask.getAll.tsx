import { useState } from "react";
import { useLoaderData, Outlet, useFetcher, Form } from "@remix-run/react";
import { json, LoaderFunction, ActionArgs, redirect } from "@remix-run/node";
import { formDataToObject } from "~/helpers/utilities";

interface LoaderContext {
  request: Request;
  params: { orgId: string; projectId: string };
  _id: string;
  name: string;
  description: string;
  project: string;
}

interface Task {
  _id: string;
  name: string;
  description: string;
  project: string;
  orgId: string;
  projectId: string;
}


//get all tasks for an org that are not part of the current project
//cache diabled due to rendering issues
export async function loader({ request, params }: LoaderContext) {
  const response = await fetch(
    `http://localhost:3000/api/task/${params.orgId}/${params.projectId}/getAllTasks`,
    {
      headers: {
        cookie: request.headers.get("cookie") || "",
        "cache-control": "no-cache, no-store, must-revalidate",
      },
    }
  );
  
  const tasks: LoaderContext = await response.json();
  return json({
    tasks,
    projectId: params.projectId,
    orgId: params.orgId,  
});
}

export async function action({ request, params }: ActionArgs) {
  const { projectId, orgId } = params;
  console.log("action params", params);
  let formData = await request.formData();
  let data = formDataToObject(formData);
  const taskId = data.taskId;

  let response = await fetch(`http://localhost:3000/api/task/${projectId}/${taskId}/addTask`, {
    method: 'POST',
    headers: {
      cookie: request.headers.get('cookie') || '',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return json({ error: 'Failed to add task to project' }, { status: 400 });
  }
      // return window.location.reload();
  return redirect(`/tasks/${orgId}/${projectId}/taskManager/AddTask/getAll/tasks`);
}


export default function GetAllTasks() {

  const { tasks } = useLoaderData();
  // const { tasks, projectId, orgId } = useLoaderData();

 


// const handleAddAllToProject = async () => {
//   console.log("handleAddAllToProject", { orgId, projectId }); // Verify they exist
//   try {
//     const response = await fetch(`/api/task/${orgId}/${projectId}/addAllTasks`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     } else {
//       // If you need to process response data, you can do it here.
//       // const data = await response.json();
//     }
//   } catch (error) {
//     console.error(error);
//     // Handle errors as needed
//   }
// };
  

  

  return (
    
<div className="flex">
  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-1/2">
    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
      <div className="mr-4 flex flex-col items-left justify-center rounded border p-4">
        <ul className='space-y-2'>
          {tasks.map(task => (
            <Form key={task._id} method="post" noValidate encType="multipart/form-data">
              <input type="hidden" name="taskId" value={task._id}/>
              <div className='flex justify-between items-center'>
                <label>{task.name}</label>
                <button type="submit" className="inline-flex items-center justify-center rounded-md border border-primary py-1 px-2.5 text-center font-medium text-primary hover:bg-opacity-90">Add</button>
              </div>
            </Form>
          ))}
        </ul>
      </div>
    </div>
  </div>
  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-1/2">
    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
      <Outlet />
    </div>
  </div>
</div>

  
  );
}
