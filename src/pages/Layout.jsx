const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="p-4 text-center text-2xl font-bold bg-blue-600 text-white">
        Week Task Tracker
      </header>
      <main className="flex-grow p-0 ">{children}</main>
      <footer className="p-0 lg:p-4 text-center text-sm bg-gray-800 text-white">
        Stay consistent and crush your week!
      </footer>
    </div>
  );
};

export default Layout;