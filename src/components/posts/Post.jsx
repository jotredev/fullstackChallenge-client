import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiChat1Line, RiDeleteBinLine } from "react-icons/ri";
import { dateFormat, shortDateAndHour } from "../../helpers/datesFormat";
import useAuth from "../../hooks/useAuth";
import axiosClient from "../../configs/axiosClient";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

export default function Post({ post }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { auth, postsCreator } = useAuth();

  const navigate = useNavigate();

  const handleSubmitReview = async (e) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.post(`/posts/reviews/${post.id}`, {
        name,
        comment,
        id_post: post.id,
      });
      if (data.response === "success") {
        post.reviews.unshift(data.review);
        toast.success("Comentario registrado");
        setName("");
        setComment("");
      }
    } catch (error) {
      console.log(error);
      if (error.response.data?.errors?.length > 0) {
        error.response.data.errors.forEach((err) => {
          toast.error(err.msg);
        });
      }
      switch (error.response.data.type) {
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

  const handleDeletePost = async () => {
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

      const { data } = await axiosClient.delete(`/posts/${post.id}`, config);
      if (data.response === "success") {
        toast.success("Post eliminado");
        navigate("/admin/inicio");
      }
    } catch (error) {
      console.log(error);
      if (error.response.data?.errors?.length > 0) {
        error.response.data.errors.forEach((err) => {
          toast.error(err.msg);
        });
      }
      switch (error.response.data.type) {
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
    <li>
      <div className="bg-white hover:shadow-lg transition-all block p-6 rounded-xl mb-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 bg-dark-primary ring-2 bg-gray-900 ring-gray-500 flex items-center justify-center rounded-full text-white text-sm uppercase">
              {post.user.name.charAt(0)}
              {post.user.lastname.charAt(0)}
            </span>
            <div>
              <h3 className="text-lg">
                {post.user.name} {post.user.lastname}
              </h3>
              <p className="text-gray-500 text-xs">{post.user.email}</p>
            </div>
          </div>
          {postsCreator && (
            <button onClick={() => handleDeletePost()} type="button">
              <RiDeleteBinLine />
            </button>
          )}
        </div>
        <Link
          to={auth.id ? `/admin/posts/${post.id}` : "#"}
          className="text-lg font-bold mb-3 relative md:before:absolute md:before:-left-[60.5px] md:before:top-1/2 md:before:-translate-y-1/2 md:before:w-2 md:before:h-2 md:before:bg-dark-secondary md:before:rounded-full md:before:ring-4 md:before:ring-gray-100 before:bg-gray-900 hover:underline"
        >
          <p className="static lg:absolute -left-56 top-1/2 -translate-y-1/2 text-sm font-normal">
            {dateFormat(post.createdAt)}
          </p>
          {post.title}
        </Link>
        <p className="mb-3 text-gray-500 text-sm">{post.desc}</p>
        <div className="mt-6">
          <div>
            <span className="flex items-center gap-2 text-sm">
              <RiChat1Line /> {post.reviews.length}
            </span>
          </div>
        </div>
        {!auth.id && (
          <form onSubmit={handleSubmitReview} className="mt-8">
            <div className="relative w-full mb-2">
              <input
                type="text"
                className="py-3 px-4 rounded-xl outline-none bg-gray-100 w-full"
                placeholder="Nombre completo"
                required={true}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <textarea
                className="py-3 px-4 rounded-xl resize-none outline-none bg-gray-100 w-full"
                placeholder="Comentario"
                rows={3}
                required={true}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <input
                type="submit"
                value="Comentar"
                className="cursor-pointer py-3 px-5 rounded-xl hover:bg-gray-100 transition-colors"
              />
            </div>
          </form>
        )}
        {post.reviews.length > 0 && (
          <div className="mt-8">
            {post.reviews.map((review) => (
              <div key={review.id} className="bg-gray-100 p-4 rounded-xl mb-6">
                <div className="flex items-center justify-between gap-4">
                  <h5 className="font-bold mb-4">{review.name}</h5>
                  <p className="text-sm">
                    {shortDateAndHour(review.createdAt)}
                  </p>
                </div>
                <div className="bg-gray-200 p-4 rounded-xl">
                  <p className="text-gray-500">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}
