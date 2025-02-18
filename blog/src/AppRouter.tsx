import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

import Home from "./pages/Home";
import Template from "./Template";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Comments from "./pages/Comments";
import Likes from "./pages/Likes";
import Search from "./pages/Search";

export default function AppRouter() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Template />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/comments/:id",
          element: <Comments />,
        },
        {
          path: "/likes/:id/:type",
          element: <Likes />,
        },
        {
          path: "/search",
          element: <Search />,
        },
      ],
    }
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}


export const queryClient = new QueryClient();