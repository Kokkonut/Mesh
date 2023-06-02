// import  { ReactNode } from "react";
import { useLocation } from "@remix-run/react";
import "tailwindcss/tailwind.css";

interface IndexLayoutProps {
  children: React.ReactNode;
}

export default function IndexLayout({ children }: IndexLayoutProps) {
  const location = useLocation();

  const isIndex = location.pathname === "/";


  return (
    <div className={`bg-blue-500 min-h-screen ${isIndex ? "" : "hidden"}`}>
      {children}
    </div>
  );
}
