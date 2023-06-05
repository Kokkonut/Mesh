import { LiveReload, Outlet } from "@remix-run/react";
import DashboardLayout from "~/layouts/Dashboardlayout";
import Breadcrumb from "~/components/Breadcrumb";
// import AddTask from "~/components/tasks/AddTask";
// import GetAllTasks from "~/components/tasks/getAll";
// import Tasks from "~/components/tasks/Tasks";

export default function taskManager() {
    return (
<DashboardLayout>
        <Breadcrumb pageName="Task Manager"/>
        <LiveReload />
   
        {/* <AddTask />
        <GetAllTasks />
        <Tasks /> */}
</DashboardLayout>
    );
    }