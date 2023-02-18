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

const router = createBrowserRouter([
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
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
