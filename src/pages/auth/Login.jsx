import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axiosClient from "../../configs/axiosClient";
import { toast } from "react-toastify";
import {
  RiMailLine,
  RiKey2Line,
  RiLockLine,
  RiLockUnlockLine,
} from "react-icons/ri";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      const { data } = await axiosClient.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("tokenFullStackChallenge", data.token);

      setAuth(data.user);
      navigate("/admin/inicio");
    } catch (error) {
      console.log(error);
      switch (error.response.data.type) {
        case "user-or-password-incorrect":
          toast.error("Usuario o contraseña incorrectos");
          break;
        case "server-error":
          toast.error("Error del servidor");
          break;
      }
    }
  };

  return (
    <>
      {!auth?.id ? (
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-10">Iniciar sesión</h1>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="w-full relative mb-5">
              <RiMailLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                className="bg-gray-100 py-3 pl-10 pr-4 rounded-full w-full outline-none placeholder:text-gray-500"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full relative mb-5">
              <RiKey2Line className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                className="bg-gray-100 py-3 pl-10 pr-12 rounded-full w-full outline-none placeholder:text-gray-500"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:bg-gray-200 transition-colors p-3 rounded-full"
              >
                {showPassword ? <RiLockUnlockLine /> : <RiLockLine />}
              </button>
            </div>
            <div>
              <input
                type="submit"
                value="Ingresar"
                className="cursor-pointer py-3 px-4 rounded-full bg-gray-900/90 hover:bg-gray-900 transition-colors text-white w-full"
              />
            </div>
          </form>
        </div>
      ) : (
        <Navigate to="/admin/inicio" />
      )}
    </>
  );
}
