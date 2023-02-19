import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axiosClient from "../../configs/axiosClient";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const { postsCreator } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([title, desc].includes("")) {
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

      const { data } = await axiosClient.post(
        "/posts",
        {
          title,
          desc,
        },
        config
      );
      if (data.response === "success") {
        toast.success("Post creado correctamente");
        setTitle("");
        setDesc("");
      }
      navigate("/admin/inicio");
    } catch (error) {
      console.log(error);
      if (error.response.data?.errors?.length > 0) {
        error.response.data.errors.forEach((err) => {
          toast.error(err.msg);
        });
      }
      switch (error.response.data.type) {
        case "not-permissions":
          toast.error("No tienes permisos para crear posts");
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
      {postsCreator ? (
        <div>
          <div className="flex items-center justify-between gap-8 mb-10">
            <h1 className="text-2xl font-bold">Crear post</h1>
            <nav className="mt-1">
              <Link to="/admin/inicio" className="hover:underline">
                Inicio
              </Link>
              <span className="mx-2">/</span>
              <Link to="/admin/inicio" className="hover:underline">
                Posts
              </Link>
              <span className="mx-2">/</span>
              <span className="font-bold">Crear post</span>
            </nav>
          </div>
          <div className="p-8 bg-white rounded-xl">
            <form onSubmit={handleSubmit}>
              <div className="relative w-full mb-6">
                <input
                  type="text"
                  className="py-3 px-4 rounded-xl outline-none bg-gray-100 w-full"
                  placeholder="Titulo del post"
                  required={true}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <textarea
                  className="py-3 px-4 rounded-xl resize-none outline-none bg-gray-100 w-full"
                  placeholder="Contenido del post"
                  rows={5}
                  required={true}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
              <div className="mt-6 flex justify-center">
                <input
                  type="submit"
                  value="Crear post"
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
