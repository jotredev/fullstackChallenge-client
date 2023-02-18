import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import UserCard from "../../components/users/UserCard";
import axiosClient from "../../configs/axiosClient";
import Loading from "../../components/Loading";
import useAuth from "../../hooks/useAuth";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { isAdmin } = useAuth();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        // Check if token exists
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

        const { data } = await axiosClient("/users", config);
        setUsers(data.users);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      {isAdmin ? (
        <div>
          <div className="flex items-center justify-between gap-8">
            <h1 className="text-2xl font-bold">Usuarios</h1>
            <nav className="mt-1">
              <Link to="/admin/inicio" className="hover:underline">
                Inicio
              </Link>
              <span className="mx-2">/</span>
              <span className="font-bold">Usuarios</span>
            </nav>
          </div>
          <div className="mt-6">
            <Link
              to="/admin/usuarios/registrar"
              className="py-3 px-6 rounded-full bg-gray-200/70 hover:bg-gray-200 transition-colors"
            >
              Crear usuario
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      ) : (
        <Navigate to="/admin/inicio" />
      )}
    </>
  );
}
