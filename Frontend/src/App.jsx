import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import StripeTest from "./routes/StripeTest";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import AdminLogin, { action as loginAction } from "./routes/AdminLogin";
import AdminSignUp, { action as signUpAction } from "./routes/AdminSignUp";
import Appointments from "./pages/Appointments";
import Barbers from "./pages/Barbers";
import Services from "./pages/Services";
import Profile, { loader as profileLoader } from "./pages/Profile";

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
        path: "/stripe-test",
        element: <StripeTest />,
      },
      {
        path: "/contact",
        element: <Contact />,
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
        path: "/admin/appointments",
        element: <Appointments />,
      },
      {
        path: "/admin/services",
        element: <Services />,
      },
      {
        path: "/admin/barbers",
        element: <Barbers />,
      },
      {
        path: "/admin/profile",
        element: <Profile />,
        loader: profileLoader,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
