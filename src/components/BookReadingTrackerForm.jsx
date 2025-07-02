import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner";

export default function BookReadingTrackerForm({ handleSubmit }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {toast.warning('Title and author must be filled'); return};

    handleSubmit({id:new Date(), title, author, status: "unread" });
    setTitle("");
    setAuthor("");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <Input placeholder="Book Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input placeholder="Author Name" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <Button type="submit">Add Book</Button>
    </form>
  );
}
