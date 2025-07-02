export default function BookReadingTrackerLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 shadow-md bg-white dark:bg-gray-900 text-xl font-bold">
        📘 Book Tracker
      </header>
      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-800">{children}</main>
      <footer className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">© 2025</footer>
    </div>
  );
}
