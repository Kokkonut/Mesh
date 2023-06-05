import { Form } from "@remix-run/react";
import { json, LoaderFunction, ActionFunction, redirect } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import { formDataToObject } from "~/helpers/utilities";




interface FormData {
  name: string;
}

export let action: ActionFunction = async ({ request, params }) => {
  let formData = await request.formData();
  let data = formDataToObject(formData);
  const { orgId, projectId } = params;

  let response = await fetch(`http://localhost:3000/api/task/${orgId}/${projectId}/createTask`, {
    method: 'POST',
    headers: {
      cookie: request.headers.get('cookie') || '', // use empty string if the cookie is null
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    return redirect(`/tasks/${orgId}/${projectId}/AddTask`);
  } else {
    // Handle any errors
    return new Response(null, { status: 500 });
  }
};



  
  


// export let action: ActionFunction = async ({ request, params }) => {
//   const formData = await request.formData();
//   formData.forEach(file => console.log("File: ", file));
//   console.log("---formData---", ...formData);
//   const taskData = Object.fromEntries(formData.entries());
//   console.log("---taskData---", taskData);
//   const { orgId, projectId } = params;

//   let response = await fetch(`http://localhost:3000/api/task/${orgId}/${projectId}/createTask`, {
//     method: 'POST',
//     headers: {
//       cookie: request.headers.get('cookie') || '', // use empty string if the cookie is null
//       encapsulation: 'multipart/form-data',
//     },
//     // body: JSON.stringify(taskData)
//     body: formData,
//   });


//   if (response.ok) {
//     return redirect(`/tasks/${orgId}/${projectId}/AddTask`);
//   } else {
//     // Handle any errors
//     return new Response(null, { status: 500 });
//   }
// };

function AddTask() {
  const { orgId, projectId } = useParams();

  return (
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
  );
}

export default AddTask;
