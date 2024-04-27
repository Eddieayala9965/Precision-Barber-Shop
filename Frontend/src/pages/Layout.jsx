import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const Layout = () => {
  // dynamically have the bookings on the front of the page gives the user the ability to instanly book
  // gallery for babers to have their bio and all that. but link this in the home page and stuff like that/ potentially have a barber that has their own page when clicked on so almost like a bio page
  // admin page i want it to where we can get to the page but it pops up with the login

  const primaryNav = [
    { title: "Home", path: "/" },
    { title: "Contact", path: "/contact" },
    { title: "About", path: "/about" },
    { title: "Admin", path: "/admin" },
    { title: "stripe-test", path: "/stripe-test" },
  ];
  return (
    <>
      <div className={`flex flex-col min-h-screen`}>
        <div className="flex justify-center text-center items-center gap-14">
          <Nav navItems={primaryNav}></Nav>
        </div>

        <Outlet className={`flex-grow`} />
      </div>
    </>
  );
};

export default Layout;
