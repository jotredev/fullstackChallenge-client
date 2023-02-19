import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/useAuth";

export default function LayoutAdmin() {
  const { auth } = useAuth();

  return (
    <>
      {auth.id ? (
        <div className="flex h-screen">
          <div className="w-full lg:w-1/6">
            <Sidebar />
          </div>
          <main className="flex-1 p-6 container mx-auto min-h-screen overflow-y-scroll">
            <Outlet />
          </main>
        </div>
      ) : (
        <Navigate to="/auth" />
      )}
    </>
  );
}
