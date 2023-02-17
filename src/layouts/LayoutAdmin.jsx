import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function LayoutAdmin() {
  return (
    <div className="flex h-screen">
      <div className="w-full lg:w-1/6">
        <Sidebar />
      </div>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
