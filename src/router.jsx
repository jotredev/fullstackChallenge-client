import { createBrowserRouter } from "react-router-dom";
import LayoutAdmin from "./layouts/LayoutAdmin";
// Layouts
import LayoutAuth from "./layouts/LayoutAuth";
// Pages
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <LayoutAuth />,
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <Home /> },
      { path: "usuarios", element: <Users /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
