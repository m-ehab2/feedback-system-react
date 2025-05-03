import { Outlet } from "react-router";
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
