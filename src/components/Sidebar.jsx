import React from "react";
import { Link, NavLink } from "react-router-dom";
import { RiHome3Line, RiTeamLine, RiLogoutCircleRLine } from "react-icons/ri";

export default function Sidebar() {
  return (
    <aside className="h-screen overflow-y-scroll bg-white flex flex-col justify-between rounded-tr-xl rounded-br-xl">
      <div>
        <div className="text-center my-10">
          <Link to="/" className="text-2xl font-black">
            Admin<span className="text-4xl text-amber-500">.</span>
          </Link>
        </div>
        <nav className="pl-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-2 py-2 px-4 bg-gray-100 rounded-l-full transition-colors font-medium"
                : "flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded-l-full transition-colors"
            }
          >
            <RiHome3Line /> Inicio
          </NavLink>
          <NavLink
            to="/usuarios"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-2 py-2 px-4 bg-gray-100 rounded-l-full transition-colors font-medium"
                : "flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded-l-full transition-colors"
            }
          >
            <RiTeamLine /> Usuarios
          </NavLink>
        </nav>
      </div>
      <div className="p-1">
        <button
          type="button"
          className="flex items-center justify-center gap-2 w-full py-2 px-4 mb-2 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <RiLogoutCircleRLine /> Cerrar sesión
        </button>
        <div className="px-2 py-4 bg-gray-100 rounded-xl flex items-center gap-2">
          <span className="w-10 h-10 flex items-center justify-center bg-gray-900 text-white rounded-full font-bold">
            JT
          </span>
          <div>
            <h5 className="font-medium text-sm">Jorge Luis Trejo Payan</h5>
            <p className="text-xs text-gray-500">jorgeetrejoo@gmail.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
