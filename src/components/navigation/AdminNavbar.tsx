import { Link, useNavigate } from "react-router";
import { MdLogout, MdMessage } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";

const AdminNavbar = () => {
  const { isAuthenticated, logout, userName } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to={isAuthenticated ? "/admin/feedbacks" : "/"}
              className="flex items-center"
            >
              <MdMessage className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900 hidden md:block">
                Admin Dashboard
              </span>
            </Link>
          </div>
          {isAuthenticated && (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {userName || "Admin"}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <MdLogout className="h-4 w-4 mr-1" />
                <span className="hidden md:block">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
