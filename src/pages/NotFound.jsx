import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-9xl font-bold">404</h1>
      <h3 className="text-2xl text-gray-500 mb-6">
        !Ooooops página no encontrada!
      </h3>
      <Link to="/" className="text-lg hover:underline">
        Ir a inicio
      </Link>
    </div>
  );
}
