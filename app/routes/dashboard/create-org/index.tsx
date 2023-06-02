import { useState } from "react";
import DashboardLayout from "~/layouts/Dashboardlayout";
import Breadcrumb from "~/components/Breadcrumb";

function CreateOrg() {
  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleFormSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/org/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Redirect or show a success message
        console.log('Organization created successfully');
      } else {
        // Show an error message
        console.error('Failed to create organization');
      }
    } catch (error) {
      console.error('Failed to create organization', error);
    }
  };

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
<DashboardLayout>
      <Breadcrumb pageName="Create Organization" />
      <h2 className="text-2xl font-bold mb-4">Create Organization</h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="font-medium">
            Name:
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="font-medium">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            required
            value={formData.description}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded resize-none"
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
          >
            Create Organization
          </button>
        </div>
      </form>
      </DashboardLayout>

  );
}

export default CreateOrg;
