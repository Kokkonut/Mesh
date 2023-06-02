import { ReactNode, useState } from "react";
import { Link } from "@remix-run/react";
import JoinOrg from "~/routes/dashboard/join-org";
import CreateOrg from "~/routes/dashboard/create-org";
import Sidebar from "~/components/Sidebar";
import Header from "~/components/Header";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
    {/* <!-- ===== Page Wrapper Start ===== --> */}
    <div className="flex h-screen overflow-hidden">
      {/* <!-- ===== Sidebar Start ===== --> */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* <!-- ===== Sidebar End ===== --> */}

      {/* <!-- ===== Content Area Start ===== --> */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* <!-- ===== Header Start ===== --> */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Header End ===== --> */}

        {/* <!-- ===== Main Content Start ===== --> */}
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}
          </div>
        </main>
        {/* <!-- ===== Main Content End ===== --> */}
      </div>
      {/* <!-- ===== Content Area End ===== --> */}
    </div>
    {/* <!-- ===== Page Wrapper End ===== --> */}
  </div>
  )
}

export default DashboardLayout;

// interface DashboardLayoutProps {
//   children: React.ReactNode;
//   showCreateOrg: boolean;
//   closeCreateOrg: () => void;
//   showJoinOrg: boolean;
//   closeJoinOrg: () => void;
//   openCreateOrg: () => void;
//   openJoinOrg: () => void;
// }

// const DashboardLayout: React.FC<DashboardLayoutProps> = ({
//   children,
//   showCreateOrg,
//   closeCreateOrg,
//   showJoinOrg,
//   closeJoinOrg,
//   openCreateOrg,
//   openJoinOrg,
// }) => {
//   // ...
//   return (
//     <div className="flex flex-col h-screen">
//       <header className="flex justify-between items-center bg-slate-700 text-white">
//         <div className="logo text-3xl">TaskMaster</div>
//         <nav className="flex items-center justify-center flex-grow space-x-6">
//           {/* Change userData to openCreateOrg and openJoinOrg */}
//           {openCreateOrg && openJoinOrg && (
//             <>
//               <Link to="#" onClick={openCreateOrg}>
//                 Create Organization
//               </Link>
//               <Link to="#" onClick={openJoinOrg}>
//                 Join Organization
//               </Link>
//             </>
//           )}
//         </nav>
//         <div className="user-icon">{/* ... */}</div>
//       </header>
//       <div className="flex-grow bg-slate-200">{children}</div>

//       {/* Modals */}
//       {showCreateOrg && <CreateOrg closeModal={closeCreateOrg} />}
//       {showJoinOrg && <JoinOrg closeModal={closeJoinOrg} />}
//     </div>
//   );
// };

// export default DashboardLayout;
