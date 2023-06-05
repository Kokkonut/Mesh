import { useState, useEffect } from 'react';
import { useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';

interface LoaderContext {
  request: Request;
  params: { projectId: string, orgId: string };
};

interface Task {
  _id: string;
  name: string;
  description: string;
  project: string;
};

export async function loader({ request, params }: LoaderContext) {
    console.log("get project tasks loader");
  const response = await fetch(
    `http://localhost:3000/api/task/${params.orgId}/${params.projectId}/getProjectTasks`,
    {
      headers: {
        cookie: request.headers.get('cookie') || '',
        'cache-control': 'no-cache, no-store, must-revalidate'
      },
    }
  );

  const tasks: Task[] = await response.json();
  return json({ tasks, projectId: params.projectId });
}

export default function Tasks() {
  const { tasks, projectId } = useLoaderData();
  const [reload, setReload] = useState(false); // State variable to force re-render

  async function handleRemoveTask(_id: string): Promise<void> {
    const response = await fetch(`http://localhost:3000/api/task/${projectId}/${_id}/removeTask`, { method: 'DELETE' });

    if (!response.ok) {
      // Handle error. For now, just console.log
      console.log(await response.text());
      return;
    }
    setReload(!reload); // Toggle state variable to force re-render
  }

  return (
    <div className="mr-4 flex flex-col items-left justify-center rounded border p-4">
      <ul className='space-y-2'>
        {tasks.map(task => (
          <li key={task._id} className='flex justify-between items-center'>
            <span>{task.name}</span>
            <button 
              className="inline-flex items-center justify-center rounded-md border border-primary py-1 px-2.5 text-center font-medium text-primary hover:bg-opacity-90" 
              onClick={() => handleRemoveTask(task._id)}>X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
