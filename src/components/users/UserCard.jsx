import React from "react";
import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  return (
    <Link
      to={`/admin/usuarios/${user.id}`}
      className="bg-white p-8 rounded-xl text-center hover:shadow-lg transition-all"
    >
      <span className="w-14 h-14 bg-gray-900 text-white uppercase font-bold flex items-center justify-center rounded-full text-xl mx-auto">
        {user.name.charAt(0)}
        {user.lastname.charAt(0)}
      </span>
      <h3 className="mt-6 font-medium">
        {user.name} {user.lastname}
      </h3>
      <p className="text-sm text-gray-500">{user.email}</p>
      <div className="mt-4 flex items-center justify-center gap-4 flex-wrap">
        {user.permissions.map((permission) => (
          <span
            key={permission.id}
            className="bg-gray-100 text-sm py-1 px-3 rounded font-medium"
          >
            {permission.name}
          </span>
        ))}
      </div>
    </Link>
  );
}
