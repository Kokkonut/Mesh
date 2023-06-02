import React, { useState, useEffect } from 'react';
import { Form } from '@remix-run/react';
import DashboardLayout from '~/layouts/Dashboardlayout';
import Breadcrumb from '~/components/Breadcrumb';

function JoinOrg() {
  const [showForm, setShowForm] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [activeOption, setActiveOption] = useState(0);

  useEffect(() => {
    setShowForm(true);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      fetch(`/api/org/search?query=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
          if (!Array.isArray(data)) {
            console.error('API response is not an array', data);
            setResults([]);
          } else {
            setResults(data);
          }
        })
        .catch(error => {
          console.error('Failed to fetch search results', error);
          setResults([]);
        });
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  async function handleSubmit(event: any) {
    event.preventDefault();
    const response = await fetch('/api/org/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orgName: event.currentTarget.orgName.value }),
    });

    if (response.ok) {
      // Redirect or show a success message
      console.log('Successfully joined organization');
    } else {
      // Show an error message
      console.error('Failed to join organization');
    }
  }

  const handleClick = (result: string) => {
    setSearchQuery(result);
    setResults([]);
  };

  return (
    <DashboardLayout>
      <Breadcrumb pageName="Join Organization" />

      <div className="rounded-sm border py-4 px-4 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {showForm && (
          <Form method="post" onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label htmlFor="orgId" className="mb-3 block text-black dark:text-white">
                  Search for an organization
                </label>
                <input
                  id="orgName"
                  name="orgName"
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  onChange={e => setSearchQuery(e.target.value)}
                />
                {results.map((result, index) => (
                  <div 
                    key={index}
                    className={`list-item ${index === activeOption ? 'active-item' : ''}`}
                    onClick={() => handleClick(result)}
                    onKeyDown={() => handleClick(result)}
                    tabIndex={0}
                  >
                    {result}
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  Join Organization
                </button>
              </div>
            </div>
            </Form>
        )}
      </div>
    </DashboardLayout>
  );
}

export default JoinOrg;