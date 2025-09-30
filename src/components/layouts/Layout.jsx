import Nav from "./Navbar";
import { Outlet } from "react-router";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}


