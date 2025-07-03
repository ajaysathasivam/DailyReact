import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import { toast } from "sonner";

const categories = ["Health", "Work", "Coding", "Finance", "Hobby"];

export default function ProgressForm({ handleFormData }) {
  const [form, setForm] = useState({ title: "", category: "coding", percentage: "" });

  const handleSubmit = () => {
    const { title, category, percentage } = form;

    if (!title || !category || percentage === "" || isNaN(percentage) || percentage < 0 || percentage > 100) {
      toast.error("Please fill out all fields correctly (0-100%)");
      return;
    }

    handleFormData({ ...form, percentage: Number(percentage) });
    setForm({ title: "", category: "", percentage: "" });
    toast.success("Progress added!");
  };

  return (
    <div className="p-4 space-y-4 bg-white shadow-md rounded-xl max-w-md mx-auto">
      <Input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <Select  value={form.category} onValueChange={(val) => setForm({ ...form, category: val })}>
        <SelectTrigger >
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent >
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="number"
        placeholder="Progress %"
        value={form.percentage}
        onChange={(e) => setForm({ ...form, percentage: e.target.value })}
      />

      <Button onClick={handleSubmit} className="w-full">
        Add Progress
      </Button>
    </div>
  );
}