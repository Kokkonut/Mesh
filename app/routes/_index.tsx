import { Link } from "react-router-dom";
import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-700">
      <h1 className="text-6xl font-bold text-white drop-shadow">TaskMaster</h1>
      <Link to="/login">
      <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 m-4" data-te-ripple-init>
        Login
      </button>
      </Link>
    </div>
  );
}
