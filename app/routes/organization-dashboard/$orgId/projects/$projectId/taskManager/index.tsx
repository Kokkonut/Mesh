import { useEffect, useState } from "react";
import { useParams } from "@remix-run/react";

import AddTask from "./AddTask";
// import AppliedTasks from "~/components/tables/ProjectTasks";
import DashboardLayout from "~/layouts/Dashboardlayout";
import Breadcrumb from "~/components/Breadcrumb";

const ProjectTaskManager = () => {

    return ( 
        <DashboardLayout>
            <Breadcrumb pageName="Manage Tasks"/>
     <>
     <AddTask/>
     {/* <AppliedTasks /> */}

     </>
        </DashboardLayout>
        );
};

export default ProjectTaskManager;