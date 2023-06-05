import React, { useEffect, useState } from "react";
import AvailableUsers from "~/components/tables/AvailableUsers";
import AssignedUsers from "~/components/tables/AssignedUsers";
import { useParams } from "@remix-run/react";

import DashboardLayout from "~/layouts/Dashboardlayout";
import Breadcrumb from "~/components/Breadcrumb";

const ProjectUserManagement = () => {
  const { orgId, projectId } = useParams();
  const [availableUsers, setAvailableUsers] = useState<any[]>([]);
  const [assignedUsers, setAssignedUsers] = useState<any[]>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    // Fetch available users
    const fetchAvailableUsers = async () => {
      const res = await fetch(
        `/api/project/${orgId}/${projectId}/availableUsers`
      );
      const data = await res.json();
      setAvailableUsers(data);
      setloading(false);
    };

    // Fetch assigned users
    const fetchAssignedUsers = async () => {
      const res = await fetch(
        `/api/project/${orgId}/${projectId}/assignedUsers`
      );
      const data = await res.json();
      setAssignedUsers(data);
    };

    fetchAvailableUsers();
    fetchAssignedUsers();
  }, [orgId, projectId]);

  if (loading) {
    return <div>LOADING</div>;
  }

  const assignToProject = async (userId: any) => {
    // Add user to project
    const res = await fetch(
      `/api/project/${orgId}/${projectId}/assignUser/${userId}`,
      {
        method: "POST",
      }
    );
    if (res.ok) {
      // Refresh users
      setAvailableUsers(availableUsers.filter((user) => user._id !== userId));
      const user = availableUsers.find((user) => user._id === userId);
      setAssignedUsers([...assignedUsers, user]);
    }
  };

  const removeFromProject = async (userId: any) => {
    // Remove user from project
    const res = await fetch(
      `/api/project/${orgId}/${projectId}/removeUser/${userId}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      // Refresh users
      setAssignedUsers(assignedUsers.filter((user) => user._id !== userId));
      const user = assignedUsers.find((user) => user._id === userId);
      setAvailableUsers([...availableUsers, user]);
    }
  };

  return (
    <DashboardLayout>
      <Breadcrumb pageName="Manage Users" />
      <div>
        <AvailableUsers
          users={availableUsers}
          assignToProject={assignToProject}
        />
        <AssignedUsers
          users={assignedUsers}
          removeFromProject={removeFromProject}
        />
      </div>
    </DashboardLayout>
  );
};

export default ProjectUserManagement;
