import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import StripeTest from "./routes/StripeTest";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import AdminLogin from "./routes/AdminLogin";
import AdminSignUp, { action as signUpAction } from "./routes/AdminSignUp";

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
      },
      {
        path: "/admin/signup",
        element: <AdminSignUp />,
        action: signUpAction,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
