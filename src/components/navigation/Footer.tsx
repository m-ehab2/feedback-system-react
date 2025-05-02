import { FaHeart } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 hidden md:block">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {currentYear} Customer Feedback System. All rights reserved.
          </div>
          <div className="flex items-center text-sm text-gray-500">
            Made with <FaHeart className="h-4 w-4 mx-1 text-red-500" /> by your
            team
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
