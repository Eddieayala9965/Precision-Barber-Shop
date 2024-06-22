import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import About from "./pages/About";
import Admin from "./pages/Admin";
import AdminLogin, { action as loginAction } from "./routes/AdminLogin";
import AdminSignUp, { action as signUpAction } from "./routes/AdminSignUp";
import Barbers from "./pages/Barbers";
import Profile from "./pages/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AvatarProvider } from "../src/context/AvatarContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/admin/login",
        element: <AdminLogin />,
        action: loginAction,
      },
      {
        path: "/admin/signup",
        element: <AdminSignUp />,
        action: signUpAction,
      },
      {
        path: "/admin/barbers",
        element: <Barbers />,
      },
      {
        path: "/admin/profile",
        element: <Profile />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AvatarProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RouterProvider router={router} />
        </LocalizationProvider>
      </AvatarProvider>
    </QueryClientProvider>
  );
};

export default App;
