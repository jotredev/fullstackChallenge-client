import { useState, useEffect, createContext } from "react";
import axiosClient from "../configs/axiosClient";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
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

          {
            permAdmin ? setIsAdmin(true) : setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
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
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
