import { Outlet } from "react-router";
import Footer from "../navigation/Footer";
import AdminNavbar from "../navigation/AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavbar />
      <main className="flex-1 flex">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
