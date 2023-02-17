import React, { useState } from "react";
import {
  RiMailLine,
  RiKey2Line,
  RiLockLine,
  RiLockUnlockLine,
} from "react-icons/ri";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-10">Iniciar sesión</h1>
      <form className="w-full">
        <div className="w-full relative mb-5">
          <RiMailLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="email"
            className="bg-gray-100 py-3 pl-10 pr-4 rounded-full w-full outline-none placeholder:text-gray-500"
            placeholder="Correo electrónico"
          />
        </div>
        <div className="w-full relative mb-5">
          <RiKey2Line className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type={showPassword ? "text" : "password"}
            className="bg-gray-100 py-3 pl-10 pr-12 rounded-full w-full outline-none placeholder:text-gray-500"
            placeholder="Contraseña"
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
  );
}
