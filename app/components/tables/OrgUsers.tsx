import React from "react";
import { useParams } from "@remix-run/react";

const OrgUsers = ({ users, owner, supervisors }) => {
  const { orgId } = useParams();

  // This function will be called when the "Remove" button is clicked
  const handleRemoveUser = async (userId: any) => {
    try {
      // Make a DELETE request to the back-end API to remove the user from the organization
      const response = await fetch(`/api/org/${orgId}/user/${userId}`, {
        method: "DELETE",
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
          Organization Users
        </h4>

        <div className="grid grid-cols-6 gap-4 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Role
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base"></h5>
          </div>
        </div>
        {/* OWNER */}
        {owner && (
          <div className="grid grid-cols-6 border-b border-stroke dark:border-strokedark bg-white dark:bg-boxdark">
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {owner.firstName} {owner.lastName}
              </p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{owner.email}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5  text-black dark:text-white">
              <p>Owner</p>
            </div>
            <div className="items-center justify-center p-2.5 xl:p-5"></div>
          </div>
        )}

        {/* SUPERVISORS */}
        {Array.isArray(supervisors) &&
          supervisors.map((supervisors, index) => (
            <div
              className="grid grid-cols-6 border-b border-stroke dark:border-strokedark bg-white dark:bg-boxdark"
              key={index}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="text-black dark:text-white">
                  {supervisors.firstName} {supervisors.lastName}
                </p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">
                  {supervisors.email}
                </p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5  text-black dark:text-white">
                <select className="form-select  bg-white dark:bg-boxdark">
                  <option
                    value="supervisor"
                    selected={supervisors.role === "supervisor"}
                  >
                    Supervisor
                  </option>
                  <option
                    value="employee"
                    selected={supervisors.role === "employee"}
                  >
                    Employee
                  </option>
                </select>
              </div>
              <div className="items-center justify-center p-2.5 xl:p-5">
                <button
                  className="inline-flex items-center justify-center rounded-md border border-meta-7 py-2 px-6 text-center font-medium text-meta-7 hover:bg-opacity-90 lg:px-8 xl:px-10"
                  onClick={() => handleRemoveUser(supervisors._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

        {/* EMPLOYEES */}
        {Array.isArray(supervisors) &&
          users.map(
            (
              user: {
                firstName:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | React.ReactFragment
                  | React.ReactPortal
                  | null
                  | undefined;
                lastName:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | React.ReactFragment
                  | React.ReactPortal
                  | null
                  | undefined;
                email:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | React.ReactFragment
                  | React.ReactPortal
                  | null
                  | undefined;
                role: string;
                _id: any;
              },
              index: React.Key | null | undefined
            ) => (
              <div
                className="grid grid-cols-6 border-b border-stroke dark:border-strokedark bg-white dark:bg-boxdark"
                key={index}
              >
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{user.email}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5  text-black dark:text-white">
                  <select className="form-select  bg-white dark:bg-boxdark">
                    <option
                      value="employee"
                      selected={user.role === "employee"}
                    >
                      Employee
                    </option>
                    <option
                      value="supervisor"
                      selected={user.role === "supervisor"}
                    >
                      Supervisor
                    </option>
                  </select>
                </div>
                <div className="items-center justify-center p-2.5 xl:p-5">
                  <button
                    className="inline-flex items-center justify-center rounded-md border border-meta-7 py-2 px-6 text-center font-medium text-meta-7 hover:bg-opacity-90 lg:px-8 xl:px-10"
                    onClick={() => handleRemoveUser(user._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )
          )}
      </div>
    </>
  );
};

export default OrgUsers;
