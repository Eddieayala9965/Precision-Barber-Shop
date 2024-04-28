import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const Admin = () => {
  const primaryNav = [
    { title: "Login", path: "/admin/login" },
    { title: "Sign Up", path: "/admin/signup" },
  ];
  return (
    <div className={`flex flex-col min-h-screen`}>
      <div className="flex justify-center text-center items-center gap-14">
        <Nav navItems={primaryNav}></Nav>
      </div>

      <Outlet className={`flex-grow`} />
    </div>
  );
};

export default Admin;
