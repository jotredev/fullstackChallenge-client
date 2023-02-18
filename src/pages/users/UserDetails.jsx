import React, { useEffect, useState } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import axiosClient from "../../configs/axiosClient";
import InfoUser from "../../components/users/InfoUser";
import ColRight from "../../components/users/ColRight";

export default function UserDetails() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const { isAdmin } = useAuth();
  const params = useParams();
  const navigate = useNavigate();

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
        const { data } = await axiosClient(`/users/${params.id}`, config);
        setUser(data.user);
      } catch (error) {
        console.log(error);
        setUser({});
        navigate("/usuarios");
      }
      setLoading(false);
    })();
  }, [params.id]);

  if (loading) return <Loading />;

  return (
    <>
      {isAdmin ? (
        <div>
          <div className="flex items-center justify-between gap-8 mb-10">
            <h1 className="text-2xl font-bold">
              {user.name} {user.lastname}
            </h1>
            <nav className="mt-1">
              <Link to="/admin/inicio" className="hover:underline">
                Inicio
              </Link>
              <span className="mx-2">/</span>
              <Link to="/admin/usuarios" className="hover:underline">
                Usuarios
              </Link>
              <span className="mx-2">/</span>
              <span className="font-bold">
                {user.name} {user.lastname}
              </span>
            </nav>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <InfoUser user={user} />
            <ColRight user={user} setUser={setUser} />
          </div>
        </div>
      ) : (
        <Navigate to="/admin/inicio" />
      )}
    </>
  );
}
