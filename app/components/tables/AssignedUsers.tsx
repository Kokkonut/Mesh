import React from "react";

interface AssignedUsersProps {
  users: any;
  removeFromProject: (arg: string) => void;
}

const AssignedUsers = ({ users, removeFromProject }: AssignedUsersProps) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Assigned Users
      </h4>

      <div className="grid grid-cols-4 gap-4 rounded-sm bg-gray-2 dark:bg-meta-4">
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
          <h5 className="text-sm font-medium uppercase xsm:text-base"></h5>
        </div>
      </div>

      {Array.isArray(users) &&
        users.map((user) => (
          <div
            className="grid grid-cols-4 border-b border-stroke dark:border-strokedark bg-white dark:bg-boxdark"
            key={user._id}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{user.email}</p>
            </div>
            <div className="items-center justify-center p-2.5 xl:p-5">
              <button
                className="inline-flex items-center justify-center rounded-md border border-meta-7 py-2 px-6 text-center font-medium text-meta-7 hover:bg-opacity-90 lg:px-8 xl:px-10"
                onClick={() => removeFromProject(user._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AssignedUsers;
