import React from "react";
import { useParams } from "@remix-run/react";
import { Link } from "@remix-run/react";

interface OrgProjectsProps {
    projects: any[];
}

const OrgProjects: React.FC<OrgProjectsProps> = ({ projects }) => {
  const { orgId } = useParams();
//Updater for selected project
  const handleUpdateProject = async (projectId: any, field: string, value: string) => {
    try {
      const response = await fetch(`/api/project/${orgId}/${projectId}`, {
        method: "PATCH",
        body: JSON.stringify({ [field]: value }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        window.location.reload();
      } else {
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
          Organization Projects
        </h4>

        <div className="grid grid-cols-3 gap-4 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Phase
            </h5>
          </div>
        </div>

        {Array.isArray(projects) &&
          projects.map((project) => (
            <div
              className="grid grid-cols-3 border-b border-stroke dark:border-strokedark bg-white dark:bg-boxdark"
              key={project._id}
            >
         
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <Link to={`/organization-dashboard/${orgId}/projects/${project._id}/details`}>
                <p className="text-black dark:text-white">{project.name}</p>
                </Link>
              </div>
              
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <select
                  className="py-2 pl-3 pr-8 rounded-md text-black dark:text-white bg-gray-2 dark:bg-meta-4 focus:outline-none dark:focus:ring-offset-boxdark"
                  onChange={(e) =>
                    handleUpdateProject(project._id, "status", e.target.value)
                  }
                >
                  <option value="active" selected={project.status === "active"}>
                    Active
                  </option>
                  <option
                    value="on hold"
                    selected={project.status === "on hold"}
                  >
                    On Hold
                  </option>
                  <option
                    value="completed"
                    selected={project.status === "completed"}
                  >
                    Completed
                  </option>
                  <option
                    value="cancelled"
                    selected={project.status === "cancelled"}
                  >
                    Cancelled
                  </option>
                </select>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <select
                  className="py-2 pl-3 pr-8 rounded-md text-black dark:text-white bg-gray-2 dark:bg-meta-4 focus:outline-none dark:focus:ring-offset-boxdark"
                  onChange={(e) =>
                    handleUpdateProject(project._id, "phase", e.target.value)
                  }
                >
                  <option value="ideate" selected={project.phase === "ideate"}>
                    Ideate
                  </option>
                  <option
                    value="discover"
                    selected={project.phase === "discover"}
                  >
                    Discover
                  </option>
                  <option
                    value="deliver"
                    selected={project.phase === "deliver"}
                  >
                    Deliver
                  </option>
                  <option value="embed" selected={project.phase === "embed"}>
                    Embed
                  </option>
                  <option value="closure" selected={project.phase === "closure"}>
                    Closure
                  </option>
                </select>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default OrgProjects;
