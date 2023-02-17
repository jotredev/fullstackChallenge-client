import React from "react";
import { Outlet } from "react-router-dom";

export default function LayoutAuth() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-screen">
      <div className="bg-white h-full flex items-center p-8">
        <Outlet />
      </div>
      <div className="lg:col-span-3 hidden md:flex flex-col items-center justify-center">
        <h1 className="text-3xl font-black">Bienvenido</h1>
        <p className="text-gray-500 tracking-widest">
          Bienvenido al administrador
        </p>
      </div>
    </div>
  );
}
