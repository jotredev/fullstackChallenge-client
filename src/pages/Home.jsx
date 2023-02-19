import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Post from "../components/posts/Post";
import useAuth from "../hooks/useAuth";
import axiosClient from "../configs/axiosClient";
import Loading from "../components/Loading";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth, postsCreator } = useAuth();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axiosClient("/posts");
        setPosts(data.posts);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loading />;
  return (
    <>
      <div className="flex items-center justify-between gap-8 mt-6">
        <h1 className="text-2xl font-bold flex-1 text-center">Posts</h1>
        {postsCreator && (
          <Link
            to="/admin/posts/crear-post"
            className="py-3 px-4 bg-white rounded-full"
          >
            Crear post
          </Link>
        )}
      </div>
      <ul className="my-14 md:border-l md:pl-8  max-w-3xl mx-auto md:border-gray-900">
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <p className="text-center text-gray-500 mt-10">No hay posts</p>
        )}
      </ul>
    </>
  );
}
