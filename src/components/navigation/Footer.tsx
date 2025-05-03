const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 hidden md:block">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="text-sm text-gray-500 mb-4 md:mb-0 text-center">
          &copy; {currentYear} Customer Feedback System. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
