import { useState } from "react";
import BookReadingTrackerLayout from "../components/BookReadingTrackerLayout";
import BookReadingTrackerForm from "../components/BookReadingTrackerForm";
import BookReadingTrackerCard from "../components/BookReadingTrackerCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { toast } from "sonner";

export default function BookReadTracker() {
    const [books, setBooks] = useState([]);
    const [filter, setFilter] = useState("all");

    const handleSubmit = (book) => {
        setBooks((prev) => [...prev, book]);
    };


    const handleToggleStatus = (id) => {
        setBooks((prev) =>
            prev.map((book) => {
                if (book.id !== id) return book;

                const updated = {
                    ...book,
                    status: book.status === "read" ? "unread" : "read",
                };

                toast.success(`${updated.title} marked as ${updated.status.toUpperCase()}`);

                return updated;
            })
        );
    };


    const filteredBooks =
        filter === "all" ? books : books.filter((book) => book.status === filter);


    return (
        <>
            <div className="grid md:grid-cols-2 gap-8">
                {/* Hero + Form */}
                <div className="space-y-6">
                    <section>
                        <h1 className="text-3xl font-bold mb-2">Welcome to Book Tracker 📚</h1>
                        <p className="text-gray-700 dark:text-gray-300">
                            Track your reading journey and develop the habit of reading with ease.
                        </p>
                    </section>
                    <BookReadingTrackerForm handleSubmit={handleSubmit} />
                </div>

                {/* Hero Image */}
                <div className="hidden md:block">
                    <img src="/src/assets/read-book.jpg" loading="lazy" alt="Reading Hero" className="w-full h-auto rounded-lg shadow" />
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="mt-10">
                <Tabs value={filter} onValueChange={setFilter}>
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="read">Read</TabsTrigger>
                        <TabsTrigger value="unread">Unread</TabsTrigger>
                    </TabsList>

                    <TabsContent value={filter}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {filteredBooks.map((book, index) => (
                                <BookReadingTrackerCard key={index} {...book} onToggleStatus={() => handleToggleStatus(book.id)} />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </>

    );
}
