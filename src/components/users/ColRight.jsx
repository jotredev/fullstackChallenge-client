import React, { useState } from "react";
import {
  RiKey2Line,
  RiMailLine,
  RiUser3Line,
  RiCloseFill,
} from "react-icons/ri";
import { toast } from "react-toastify";
import axiosClient from "../../configs/axiosClient";
import Loading from "../../components/Loading";

export default function ColRight({ user, setUser }) {
  const [name, setName] = useState(user.name);
  const [lastname, setLastname] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [permission, setPermission] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    if ([name, lastname, email].includes("")) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("tokenFullStackChallenge");

      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.put(
        `/users/${user.id}`,
        {
          name,
          lastname,
          email,
        },
        config
      );
      if (data.response === "success") {
        setUser({ ...user, name, lastname, email });
        toast.success("Usuario actualizado correctamente");
      }
    } catch (error) {
      console.log(error);
      if (error.response.data?.errors?.length > 0) {
        error.response.data.errors.forEach((err) => {
          toast.error(err.msg);
        });
      }
      switch (error.response.data.type) {
        case "user-not-found":
          toast.error("El usuario no existe");
          break;
        case "not-admin":
          toast.error("No tienes permisos para realizar esta acción");
          break;
        case "email-already-exists":
          toast.error("El email ya existe");
          break;
        case "server-error":
          toast.error("Error del servidor");
          break;
      }
    }
    setLoading(false);
  };

  const handleAddPermission = async (e) => {
    e.preventDefault();

    if (permission === "") {
      toast.error("El permiso es obligatorio");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("tokenFullStackChallenge");

      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post(
        `/users/permission/${user.id}`,
        {
          permission,
        },
        config
      );
      if (data.response === "success") {
        setUser({
          ...user,
          permissions: [...user.permissions, data.permission],
        });
        toast.success("Permiso agregado");
      }
    } catch (error) {
      console.log(error);
      if (error.response.data?.errors?.length > 0) {
        error.response.data.errors.forEach((err) => {
          toast.error(err.msg);
        });
      }
      switch (error.response.data.type) {
        case "user-not-found":
          toast.error("El usuario no existe");
          break;
        case "not-admin":
          toast.error("No tienes permisos para realizar esta acción");
          break;
        case "user-already-has-permission":
          toast.error("El usuario ya tiene este permiso");
          break;
        case "server-error":
          toast.error("Error del servidor");
          break;
      }
    }
    setLoading(false);
  };

  const handleDeletePermission = async (permission) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("tokenFullStackChallenge");

      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.put(
        `/users/permission/${user.id}`,
        {
          permission,
        },
        config
      );
      if (data.response === "success") {
        setUser({
          ...user,
          permissions: user.permissions.filter(
            (perm) => perm.name !== permission
          ),
        });
        toast.success("Permiso eliminado");
      }
    } catch (error) {
      console.log(error);
      if (error.response.data?.errors?.length > 0) {
        error.response.data.errors.forEach((err) => {
          toast.error(err.msg);
        });
      }
      switch (error.response.data.type) {
        case "user-not-found":
          toast.error("El usuario no existe");
          break;
        case "not-admin":
          toast.error("No tienes permisos para realizar esta acción");
          break;
        case "permission-not-found":
          toast.error("EL usuario no tiene el permiso");
          break;
        case "server-error":
          toast.error("Error del servidor");
          break;
      }
    }
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <div className="lg:col-span-2">
      <div className="p-6 bg-white rounded-xl hover:shadow-lg transition-all mb-8">
        <h1 className="uppercase font-bold">Información personal</h1>
        <form onSubmit={handleUpdateUser} className="mt-8">
          <div className="flex items-center gap-8">
            <div className="w-full relative mb-5">
              <RiUser3Line className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                className="bg-gray-100 py-3 pl-10 pr-12 rounded-xl w-full outline-none placeholder:text-gray-500"
                placeholder="Nombre (s)"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full relative mb-5">
              <RiUser3Line className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                className="bg-gray-100 py-3 pl-10 pr-12 rounded-xl w-full outline-none placeholder:text-gray-500"
                placeholder="Apellidos"
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="w-full relative mb-5">
              <RiMailLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                className="bg-gray-100 py-3 pl-10 pr-12 rounded-xl w-full outline-none placeholder:text-gray-500"
                placeholder="Correo electrónico"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full relative mb-5">
              <RiKey2Line className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                className="bg-gray-100 py-3 pl-10 pr-12 rounded-xl w-full outline-none placeholder:text-gray-500"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-2">
            <input
              type="submit"
              value="Guardar"
              className="py-2 px-4 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer outline-none"
            />
          </div>
        </form>
      </div>
      <div className="p-6 bg-white rounded-xl hover:shadow-lg transition-all">
        <h1 className="uppercase font-bold">Permisos asignados</h1>
        <form onSubmit={handleAddPermission} className="mt-8">
          <div className="flex items-center gap-4">
            <select
              className="outline-none"
              required
              value={permission}
              onChange={(e) => setPermission(e.target.value)}
            >
              <option value="">Selecciona un permiso</option>
              <option value="admin">Administrador</option>
              <option value="crd_posts">Crear y eliminar posts</option>
              <option value="update_posts">Actualizar posts</option>
            </select>
            <input
              type="submit"
              value="Agregar"
              className="py-2 px-4 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors outline-none"
            />
          </div>
        </form>
        <div className="flex items-center gap-2 flex-wrap mt-8">
          {user.permissions?.length > 0 ? (
            user.permissions.map((permission) => (
              <span
                key={permission.id}
                className="flex items-center gap-2 py-1 pl-3 pr-1 bg-gray-100 text-sm rounded-full font-medium"
              >
                {permission.name}{" "}
                <button
                  type="button"
                  onClick={() => handleDeletePermission(permission.name)}
                  className="bg-gray-200 p-1 rounded-full hover:bg-gray-300 transition-colors outline-none"
                >
                  <RiCloseFill />
                </button>
              </span>
            ))
          ) : (
            <h2>No tiene permisos</h2>
          )}
        </div>
      </div>
    </div>
  );
}
