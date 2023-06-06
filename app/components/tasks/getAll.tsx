import { useState, useEffect } from "react";
import { useLoaderData, Outlet, useFetcher } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";

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
}

export async function loader({ request, params }: LoaderContext) {
  const response = await fetch(
    `http://localhost:3000/api/task/${params.orgId}/${params.projectId}/getAllTasks`,
    {
      headers: {
        cookie: request.headers.get("cookie") || "",
        'cache-control': 'no-cache, no-store, must-revalidate',
      },
    }
  );

  const tasks: LoaderContext = await response.json();

  return json(tasks);
}

export default function GetAllTasks() {
  const fetcher = useFetcher();
  const tasks: Task[] = useLoaderData();

  // Function to handle "Add All to Project" button
  const handleAddAllToProject = () => {
    // Implement this to add all tasks to the project
  };

  const handleRemoveTask = async (_id: string) => {
    const response = await fetcher(`/api/task/${_id}/removeTask`, { method: 'DELETE' });

    if (!response.ok) {
      // Handle error. For now, just console.log
      console.log(await response.text());
    }
  };

 

  return (
    <div className="flex">
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-1/2">
       <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
      <button className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-5 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10" onClick={handleAddAllToProject}>Add All to Project</button>
      <ul>
        <div  className="mr-4 flex flex-col items-left justify-center rounded border">
        {tasks.map((task) => (
          <li key={task._id} className="pl-2">
            <div className="mr-4 flex items-left">
              <input type="checkbox" id={task._id}/>
              <label htmlFor={task._id} className="p-2">{task.name}</label>
              <button onClick={() => handleRemoveTask(task._id)}>Remove</button>
            </div>
          </li>
        ))}
        </div>
      </ul>
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
