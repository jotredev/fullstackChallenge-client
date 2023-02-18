import React from "react";

export default function InfoUser({ user }) {
  return (
    <div>
      <div className="bg-white p-6 rounded-xl hover:shadow-lg transition-all">
        <span className="flex items-center justify-center w-14 h-14 mx-auto bg-gray-900 text-white font-bold rounded-full">
          {user.name?.charAt(0)}
          {user.lastname?.charAt(0)}
        </span>
        <h5 className="mt-5 mb-1 text-center font-medium">
          {user.name} {user.lastname}
        </h5>
        <p className="text-sm text-gray-500 text-center">{user.email}</p>
        <div className="mt-6">
          <h3 className="uppercase font-bold">Permisos</h3>
          <div className="flex items-center gap-2 flex-wrap mt-4">
            {user.permissions && user.permissions.length > 0 ? (
              user.permissions.map((permission) => (
                <span
                  key={permission.id}
                  className="py-1 px-3 bg-gray-100 text-sm rounded font-medium"
                >
                  {permission.name}
                </span>
              ))
            ) : (
              <h2>No tiene permisos</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
