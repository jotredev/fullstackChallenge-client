import { useState, useEffect, createContext } from "react";
import axiosClient from "../configs/axiosClient";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [postsCreator, setPostsCreator] = useState(false);
  const [postsEditor, setPostsEditor] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authUser = async () => {
      setLoading(true);
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

      try {
        const { data } = await axiosClient("/auth/profile", config);

        // Verify is admin
        if (data.permissions) {
          const permAdmin = data.permissions.some(
            (permission) => permission.name === "admin"
          );

          const permPostsCreator = data.permissions.some(
            (permission) => permission.name === "crd_posts"
          );

          const permPostsEditor = data.permissions.some(
            (permission) => permission.name === "update_posts"
          );

          permAdmin ? setIsAdmin(true) : setIsAdmin(false);
          permPostsCreator ? setPostsCreator(true) : setPostsCreator(false);
          permPostsEditor ? setPostsEditor(true) : setPostsEditor(false);
        } else {
          setIsAdmin(false);
          setPostsCreator(false);
          setPostsEditor(false);
        }
        setAuth(data);
      } catch (error) {
        setAuth({});
      }

      setLoading(false);
    };
    authUser();
  }, []);

  const logout = () => {
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        isAdmin,
        postsCreator,
        postsEditor,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
