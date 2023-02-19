import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../configs/axiosClient";
import { toast } from "react-toastify";
import Loading from "../Loading";

export default function FormEditPost({ post, setPost }) {
  const [title, setTitle] = useState(post.title);
  const [desc, setDesc] = useState(post.desc);
  const [loading, setLoading] = useState(false);

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

      const { data } = await axiosClient.put(
        `/posts/${post.id}`,
        {
          title,
          desc,
        },
        config
      );
      if (data.response === "success") {
        toast.success("Post editado correctamente");
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
        case "post-not-found":
          toast.error("Post no encontrado");
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
          value="Editar post"
          className="cursor-pointer py-3 px-5 rounded-xl hover:bg-gray-100 transition-colors"
        />
      </div>
    </form>
  );
}
