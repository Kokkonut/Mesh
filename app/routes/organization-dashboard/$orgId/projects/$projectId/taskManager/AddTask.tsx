import { Form } from "@remix-run/react";
import { json, LoaderFunction, ActionFunction, redirect } from "@remix-run/node";
import { useParams } from "@remix-run/react";


export let action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  formData.forEach(file => console.log("File: ", file));
  console.log("---formData---", ...formData);
  const taskData = Object.fromEntries(formData.entries());
  console.log("---taskData---", taskData);
  const { orgId, projectId } = params;

  let response = await fetch(`http://localhost:3000/api/task/${orgId}/${projectId}/createTask`, {
    method: 'POST',
    headers: {
      cookie: request.headers.get('cookie') || '', // use empty string if the cookie is null
      encapsulation: 'multipart/form-data',
    },
    // body: JSON.stringify(taskData)
    body: formData,
  });


  if (response.ok) {
    return redirect(`/organization-dashboard/${orgId}/projects/${projectId}/taskManager`);
  } else {
    // Handle any errors
    return new Response(null, { status: 500 });
  }
};

function AddTask() {
  const { orgId, projectId } = useParams();

  return (
    <Form action={`/organization-dashboard/${orgId}/projects/${projectId}/taskManager/AddTask`} 
    method="post"
    encType="multipart/form-data"
    >
      <label>
        Task Name:
        <input type="text" name="name" required />
      </label>

      <button type="submit">Create Task</button>
    </Form>
  );
}

export default AddTask;
