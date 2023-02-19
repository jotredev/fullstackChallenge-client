import React, { useState, useEffect } from "react";
import { Navigate, Link, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axiosClient from "../../configs/axiosClient";
import Loading from "../../components/Loading";
import FormEditPost from "../../components/posts/FormEditPost";

export default function CreatePost() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const { postsEditor } = useAuth();
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
        const { data } = await axiosClient.get(`/posts/${params.id}`, config);
        setPost(data.post);
      } catch (error) {
        console.log(error);
        setPost({});
        navigate("/admin/inicio");
      }
      setLoading(false);
    })();
  }, [params.id]);

  if (loading) return <Loading />;

  return (
    <>
      {postsEditor ? (
        <div>
          <div className="flex items-center justify-between gap-8 mb-10">
            <h1 className="text-2xl font-bold">Editar post</h1>
            <nav className="mt-1">
              <Link to="/admin/inicio" className="hover:underline">
                Inicio
              </Link>
              <span className="mx-2">/</span>
              <Link to="/admin/inicio" className="hover:underline">
                Posts
              </Link>
              <span className="mx-2">/</span>
              <span className="font-bold">Editar post</span>
            </nav>
          </div>
          <div className="p-8 bg-white rounded-xl">
            <FormEditPost post={post} setPost={setPost} />
          </div>
        </div>
      ) : (
        <Navigate to="/admin/inicio" />
      )}
    </>
  );
}
