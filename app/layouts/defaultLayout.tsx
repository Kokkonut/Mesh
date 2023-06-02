import React, { ReactNode } from "react";
import { useLocation } from "@remix-run/react";
import "tailwindcss/tailwind.css";

interface DefaultLayoutProps {
  children: ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const location = useLocation();
  const isIndex = location.pathname === "/";

  return (
    <div className={`bg-green-500 min-h-screen ${isIndex ? "hidden" : ""}`}>
      {children}
    </div>
  );
}
