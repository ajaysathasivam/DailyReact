import { BookOpenCheck, BookMarked } from "lucide-react";

export default function BookReadingTrackerCard({ title, author, status, onToggleStatus }) {
  const isRead = status === "read";

  return (
    <div className="group bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 relative">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-blue-100 dark:bg-blue-800 mt-1 rounded-xl">
          {isRead ? (
            <BookOpenCheck className="w-6 h-6 text-green-600" />
          ) : (
            <BookMarked className="w-6 h-6 text-yellow-600" />
          )}
        </div>

        <div className="flex-1 min-w-0 text-start       ">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">By {author}</p>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onToggleStatus}
          className={`text-xs font-medium px-3 py-1 rounded-full border transition-colors duration-200 ${
            isRead
              ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
              : "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200"
          }`}
          title="Click to toggle read status"
        >
          {isRead ? "READ" : "UNREAD"}
        </button>
      </div>
    </div>
  );
}
