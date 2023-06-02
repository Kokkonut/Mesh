import React from 'react';
import { useParams } from '@remix-run/react';

// Assuming each join request object has a 'user' object with 'name' and 'email' properties
const UsersPending = ({ joinRequests }) => {
    const { orgId } = useParams();
    // This function will be called when the "Approve" or "Reject" button is clicked
    const handleUpdateJoinRequest = async (requestId, status) => {
      try {
        
        // Make a POST request to the back-end API
        const response = await fetch('/api/org/update-join-request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orgId,
            requestId,
            status
          })
        });
  
        if (response.ok) {
          // If the request was successful, refresh the page to reflect the changes
          window.location.reload();
        } else {
          // If the request was not successful, log the error message
          const responseData = await response.json();
          console.error(responseData.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <>


    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Pending Invites
      </h4>

      <div className="grid grid-cols-5 gap-4 rounded-sm bg-gray-2 dark:bg-meta-4">
        <div className="p-2.5 xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">Name</h5>
        </div>
        <div className="p-2.5 text-center xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">Email</h5>
        </div>
        <div className="p-2.5 text-center xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">Status</h5>
        </div>
        <div className="p-2.5 text-center xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base"></h5>
        </div>
        <div className="p-2.5 text-center xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base"></h5>
        </div>
      </div>

      {joinRequests.map((request, index) => (
        <div className="grid grid-cols-5 border-b border-stroke dark:border-strokedark" key={index}>
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <p className="text-black dark:text-white">{request.user.firstName} {request.user.lastName}</p>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white">{request.user.email}</p>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-meta-3">{request.status}</p>
          </div>
        {request.status === 'pending' && (
          <>
          <div className="items-center justify-center p-2.5 xl:p-5">
            <button 
            className="inline-flex items-center justify-center rounded-md border border-meta-3 py-2 px-6 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10"
            onClick={() => handleUpdateJoinRequest(request._id, 'accepted')}
            >
              Approve
            </button>
          </div>
          <div className="items-center justify-center p-2.5 xl:p-5">
            <button 
            className="inline-flex items-center justify-center rounded-md border border-meta-7 py-2 px-6 text-center font-medium text-meta-7 hover:bg-opacity-90 lg:px-8 xl:px-10"
            onClick={() => handleUpdateJoinRequest(request._id, 'rejected')}
            >
              Reject
            </button>
          </div>
          </>
        )}

        </div>
      ))}
    </div>
    </>
  );
};

export default UsersPending;
