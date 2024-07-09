import { Outlet } from "react-router-dom";
import NavAdmin from "../components/NavAdmin";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get("access_token"));

  useEffect(() => {
    const updateLoginStatus = () => {
      setIsLoggedIn(Cookies.get("access_token"));
    };

    window.addEventListener("storage", updateLoginStatus);

    return () => {
      window.removeEventListener("storage", updateLoginStatus);
    };
  }, []);

  const primaryNav = [
    { title: "Profile", path: "/admin/profile" },
    { title: "Barbers", path: "/admin/barbers" },
    ...(isLoggedIn ? [] : [{ title: "Login", path: "/admin/login" }]),
  ];

  return (
    <div className="flex min-h-screen">
      <NavAdmin navItems={primaryNav} />
      <Outlet />
    </div>
  );
};

export default Admin;
