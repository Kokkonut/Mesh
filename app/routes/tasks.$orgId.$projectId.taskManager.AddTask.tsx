import { Form, Outlet } from "@remix-run/react";
import { json, LoaderFunction, ActionFunction, redirect } from "@remix-run/node";
import { formDataToObject } from "~/helpers/utilities";

export let action: ActionFunction = async ({ request, params }) => {
  let formData = await request.formData();
  let data = formDataToObject(formData);
  const { orgId, projectId } = params;

  let response = await fetch(`http://localhost:3000/api/task/${orgId}/${projectId}/createTask`, {
    method: 'POST',
    headers: {
      cookie: request.headers.get('cookie') || '', // use empty string if the cookie is null
      'Content-Type': 'application/json',
      'cache-control': 'no-cache'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    return redirect(`/tasks/${orgId}/${projectId}/taskManager/AddTask/getAll`);
  } else {
    // Handle any errors
    return new Response(null, { status: 500 });
  }
};

function AddTask() {
  return (
    <>
    <Form 
    method="post"
    encType="multipart/form-data"
    >
      <label>
        Task Name:
        <input type="text" name="name" required />
      </label>
      <button type="submit">Create Task</button>
    </Form>
    <Outlet />
    </>
  );
}

export default AddTask;
