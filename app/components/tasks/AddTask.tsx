import { FormEvent, FunctionComponent } from 'react';
import { Form, Outlet, useFetcher, useNavigate } from '@remix-run/react';
import { formDataToObject } from '~/helpers/utilities';

interface AddTaskProps {
  orgId: string;
  projectId: string;
}

const AddTask: FunctionComponent<AddTaskProps> = ({ orgId, projectId }) => {
  const fetcher = useFetcher() as any;
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {


    const formData = new FormData(event.currentTarget);
    const data = formDataToObject(formData);

    const response = await fetcher(`/api/task/${orgId}/${projectId}/createTask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      // Handle error
      console.error('Error creating task', await response.text());
    }

    // After task is created, navigate to the same page.
    // This will trigger a new render with updated data.
    navigate(`/task/${orgId}/${projectId}`);
  };

  return (
    <>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
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
