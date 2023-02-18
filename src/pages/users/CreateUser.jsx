import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { RiUser3Line, RiMailLine, RiLockLine } from "react-icons/ri";
import axiosClient from "../../configs/axiosClient";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAdmin } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, lastname, email, password].includes("")) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
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
        "/users",
        {
          name,
          lastname,
          email,
          password,
        },
        config
      );
      if (data.response === "success") {
        toast.success("Usuario creado correctamente");
        setName("");
        setLastname("");
        setEmail("");
        setPassword("");
      }
      navigate("/admin/usuarios");
    } catch (error) {
      console.log(error);
      if (error.response.data?.errors?.length > 0) {
        error.response.data.errors.forEach((err) => {
          toast.error(err.msg);
        });
      }
      switch (error.response.data.type) {
        case "not-admin":
          toast.error("No tienes permisos para crear usuarios");
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

  if (loading) return <Loading />;

  return (
    <>
      {isAdmin ? (
        <div>
          <div className="flex items-center justify-between gap-8">
            <h1 className="text-2xl font-bold">Crear usuario</h1>
            <nav className="mt-1">
              <Link to="/admin/inicio" className="hover:underline">
                Inicio
              </Link>
              <span className="mx-2">/</span>
              <Link to="/admin/usuarios" className="hover:underline">
                Usuarios
              </Link>
              <span className="mx-2">/</span>
              <span className="font-bold">Crear usuario</span>
            </nav>
          </div>
          <div className="bg-white p-8 rounded-xl mt-10">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-8">
                <div className="relative w-full">
                  <RiUser3Line className="absolute top-1/2 -translate-y-1/2 left-4" />
                  <input
                    type="text"
                    className="py-3 pl-10 pr-4 rounded-xl outline-none bg-gray-100 w-full"
                    placeholder="Nombre (s)"
                    required={true}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="relative w-full">
                  <RiUser3Line className="absolute top-1/2 -translate-y-1/2 left-4" />
                  <input
                    type="text"
                    className="py-3 pl-10 pr-4 rounded-xl outline-none bg-gray-100 w-full"
                    placeholder="Apellidos"
                    required={true}
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-8 mt-4">
                <div className="relative w-full">
                  <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-4" />
                  <input
                    type="email"
                    className="py-3 pl-10 pr-4 rounded-xl outline-none bg-gray-100 w-full"
                    placeholder="Correo electrónico"
                    required={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="relative w-full">
                  <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-4" />
                  <input
                    type="password"
                    className="py-3 pl-10 pr-4 rounded-xl outline-none bg-gray-100 w-full"
                    placeholder="Contraseña min 6 caracteres"
                    required={true}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <input
                  type="submit"
                  value="Registrar usuario"
                  className="cursor-pointer py-3 px-5 rounded-xl hover:bg-gray-100 transition-colors"
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <Navigate to="/admin/inicio" />
      )}
    </>
  );
}
