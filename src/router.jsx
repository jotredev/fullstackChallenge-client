import { createBrowserRouter } from "react-router-dom";
import LayoutAdmin from "./layouts/LayoutAdmin";
// Layouts
import LayoutAuth from "./layouts/LayoutAuth";
// Pages
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Users from "./pages/users/Users";
import CreateUser from "./pages/users/CreateUser";
import UserDetails from "./pages/users/UserDetails";
import NotFound from "./pages/NotFound";
import CreatePost from "./pages/posts/CreatePost";
import EditPost from "./pages/posts/EditPost";
import Logs from "./pages/Logs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <LayoutAuth />,
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      { path: "/admin/inicio", element: <Home /> },
      { path: "/admin/usuarios", element: <Users /> },
      { path: "/admin/usuarios/:id", element: <UserDetails /> },
      { path: "/admin/usuarios/registrar", element: <CreateUser /> },
      { path: "/admin/posts/crear-post", element: <CreatePost /> },
      { path: "/admin/posts/:id", element: <EditPost /> },
      { path: "/admin/registros", element: <Logs /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
