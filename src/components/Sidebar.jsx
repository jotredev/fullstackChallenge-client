import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  RiHome3Line,
  RiTeamLine,
  RiLogoutCircleRLine,
  RiMenuFill,
} from "react-icons/ri";
import useAuth from "../hooks/useAuth";

export default function Sidebar() {
  const { auth, isAdmin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("tokenFullStackChallenge");
  };

  return (
    <aside className="min-h-screen overflow-y-scroll bg-white flex flex-col justify-between rounded-tr-xl rounded-br-xl">
      <div>
        <div className="text-center my-10">
          <Link to="/" className="text-2xl font-black">
            Admin<span className="text-4xl text-amber-500">.</span>
          </Link>
        </div>
        <nav className="pl-2">
          <NavLink
            to="/admin/inicio"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-2 py-2 px-4 bg-gray-100 rounded-l-full transition-colors font-medium"
                : "flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded-l-full transition-colors"
            }
          >
            <RiHome3Line /> Inicio
          </NavLink>
          {isAdmin && (
            <>
              <NavLink
                to="/admin/usuarios"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 py-2 px-4 bg-gray-100 rounded-l-full transition-colors font-medium"
                    : "flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded-l-full transition-colors"
                }
              >
                <RiTeamLine /> Usuarios
              </NavLink>
              <NavLink
                to="/admin/registros"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 py-2 px-4 bg-gray-100 rounded-l-full transition-colors font-medium"
                    : "flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded-l-full transition-colors"
                }
              >
                <RiMenuFill /> Registros
              </NavLink>
            </>
          )}
        </nav>
      </div>
      <div className="p-1">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full py-2 px-4 mb-2 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <RiLogoutCircleRLine /> Cerrar sesión
        </button>
        <div className="px-2 py-4 bg-gray-100 rounded-xl flex items-center gap-2">
          <span className="w-10 h-10 flex items-center justify-center bg-gray-900 text-white rounded-full font-bold uppercase">
            {auth.name.charAt(0)}
            {auth.lastname.charAt(0)}
          </span>
          <div>
            <h5 className="font-medium text-sm">
              {auth.name} {auth.lastname}
            </h5>
            <p className="text-xs text-gray-500">{auth.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
